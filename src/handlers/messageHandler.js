const { getCommand } = require("./commandLoader");
const regCheck = require("../middlewares/regCheck");
const config = require("../config/config");
const db = require("../database/db");
const { isOwner, isGroup } = require("../utils/utils");

async function handleMessage(sock, msg) {
  try {
    if (!msg.message) return;
    if (msg.key.fromMe) return;

    const jid = msg.key.remoteJid;
    const senderJid = msg.key.participant || jid;
    const enGrupo = isGroup(jid);

    const body =
      msg.message?.conversation ||
      msg.message?.extendedTextMessage?.text ||
      msg.message?.imageMessage?.caption ||
      msg.message?.videoMessage?.caption ||
      "";

    if (!body.startsWith(config.PREFIX)) return;

    const args = body.slice(config.PREFIX.length).trim().split(/\s+/);
    const commandName = args.shift().toLowerCase();
    if (!commandName) return;

    const command = getCommand(commandName);
    if (!command) return;

    // ── Usuarios bloqueados ───────────────────────────────────────────────────
    const store = db.loadStore();
    if ((store.blocked || []).includes(senderJid)) return;

    // ── Modo privado: solo owner puede usar en DM si está desactivado ─────────
    if (!enGrupo && !isOwner(senderJid)) {
      const privadoActivo = store.privado === true;
      if (!privadoActivo) {
        return sock.sendMessage(jid, {
          text: `🔐 Los comandos en privado están *desactivados*.\nEscríbeme en un grupo o pídele al owner que active el modo privado.`,
        });
      }
    }

    // ── Solo owner ─────────────────────────────────────────────────────────────
    if (command.ownerOnly && !isOwner(senderJid)) {
      return sock.sendMessage(jid, { text: "🔒 Este comando es solo para el *owner*." });
    }

    // ── Solo grupos ────────────────────────────────────────────────────────────
    if (command.groupOnly && !enGrupo) {
      return sock.sendMessage(jid, {
        text: "👥 Este comando solo funciona en *grupos*.",
      });
    }

    // ── Verificar registro ────────────────────────────────────────────────────
    if (!regCheck(sock, msg, senderJid, commandName)) return;

    const user = db.getUser(senderJid);

    const ctx = {
      sock,
      msg,
      jid,
      senderJid,
      args,
      body,
      user,
      enGrupo,
      isOwner: isOwner(senderJid),
      reply: (text) => sock.sendMessage(jid, { text }, { quoted: msg }),
      react: (emoji) => sock.sendMessage(jid, { react: { text: emoji, key: msg.key } }),
    };

    await command.execute(ctx);
  } catch (err) {
    console.error("[MESSAGE HANDLER] Error:", err.message);
  }
}

module.exports = { handleMessage };
