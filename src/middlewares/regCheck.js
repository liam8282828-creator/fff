const db = require("../database/db");
const config = require("../config/config");

function regCheck(sock, msg, jid, command) {
  const exempted = ["reg", "help", "menu"];
  if (exempted.includes(command)) return true;
  if (!db.isRegistered(jid)) {
    sock.sendMessage(msg.key.remoteJid, {
      text: `❌ No estás registrado.\n\nUsa *${config.PREFIX}reg nombre.edad* para registrarte.\n\nEjemplo: *${config.PREFIX}reg Nova.18*`,
    });
    return false;
  }
  if (db.isBanned(jid)) {
    sock.sendMessage(msg.key.remoteJid, {
      text: "🚫 Has sido baneado del bot.",
    });
    return false;
  }
  return true;
}

module.exports = regCheck;
