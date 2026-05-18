const { DisconnectReason } = require("@whiskeysockets/baileys");
const config = require("../config/config");
const db = require("../database/db");

let reconnectTimer = null;

function handleConnectionUpdate(update, sock, startBot) {
  const { connection, lastDisconnect, qr } = update;

  if (qr) {
    console.log("\n[NOVA BOT] Escanea el QR con tu WhatsApp:\n");
    require("qrcode-terminal").generate(qr, { small: true });
    global.currentQR = qr;
  }

  if (connection === "close") {
    const code = lastDisconnect?.error?.output?.statusCode;
    const shouldReconnect = code !== DisconnectReason.loggedOut;
    console.log(`[NOVA BOT] Conexión cerrada. Código: ${code}`);
    if (shouldReconnect) {
      console.log(`[NOVA BOT] Reconectando en ${config.RECONNECT_INTERVAL / 1000}s...`);
      if (reconnectTimer) clearTimeout(reconnectTimer);
      reconnectTimer = setTimeout(() => startBot(), config.RECONNECT_INTERVAL);
    } else {
      console.log("[NOVA BOT] Sesión cerrada. Elimina la carpeta session/ y reinicia.");
    }
  }

  if (connection === "open") {
    console.log("[NOVA BOT] ✅ Conexión establecida con WhatsApp");
    global.botConnected = true;
    global.botConnectedAt = new Date().toISOString();
  }
}

async function handleGroupParticipants(sock, { id, participants, action }) {
  try {
    const store = db.loadStore();

    if (action === "add") {
      // ── Bienvenida ────────────────────────────────────────────────────────
      const bienvenidaCfg = store.bienvenida?.[id];
      if (bienvenidaCfg?.activo) {
        const meta = await sock.groupMetadata(id).catch(() => null);
        const grupoNombre = meta?.subject || "el grupo";
        for (const jidP of participants) {
          const nombre = jidP.split("@")[0];
          const mensaje = (bienvenidaCfg.mensaje || "¡Bienvenido/a @user al grupo @grupo! 🎉")
            .replace(/@user/g, `@${nombre}`)
            .replace(/@grupo/g, grupoNombre);
          await sock.sendMessage(id, { text: mensaje, mentions: [jidP] });
        }
      }

      // ── Anti-árabe / extranjero ───────────────────────────────────────────
      if (store.antiarabe?.[id]) {
        const ownerPrefix = config.OWNER_NUMBER.slice(0, 2);
        for (const jidP of participants) {
          const num = jidP.split("@")[0];
          if (!num.startsWith(ownerPrefix) && num.length > 11) {
            await sock.groupParticipantsUpdate(id, [jidP], "remove").catch(() => {});
            await sock.sendMessage(id, {
              text: `🌍 @${num} fue expulsado por ser un número extranjero.`,
              mentions: [jidP],
            });
          }
        }
      }
    }
  } catch (err) {
    console.error("[GROUP EVENT] Error:", err.message);
  }
}

module.exports = { handleConnectionUpdate, handleGroupParticipants };
