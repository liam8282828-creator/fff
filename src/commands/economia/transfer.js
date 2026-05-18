const db = require("../../database/db");
const { formatCoins, cleanJid } = require("../../utils/utils");

module.exports = {
  name: ["transfer", "transferir", "send"],
  description: "Transferir coins a otro usuario",
  category: "ECONOMÍA",
  execute: async ({ reply, msg, senderJid, args, user, sock, jid }) => {
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    const targetJid = (mentioned && mentioned[0]) || (args[0] && `${args[0].replace(/[^0-9]/g, "")}@s.whatsapp.net`);
    const amount = parseInt(args[1] || args[0]);

    if (!targetJid || isNaN(amount) || amount <= 0) {
      return reply("❌ Uso: .transfer @usuario cantidad\nEjemplo: .transfer @Nova 500");
    }
    if (targetJid === senderJid) return reply("❌ No puedes transferirte a ti mismo.");
    if (!db.isRegistered(targetJid)) return reply("❌ Ese usuario no está registrado.");
    if (user.coins < amount) return reply(`❌ Coins insuficientes. Tienes ${formatCoins(user.coins)}.`);

    db.updateUser(senderJid, { coins: user.coins - amount });
    const target = db.getUser(targetJid);
    db.updateUser(targetJid, { coins: target.coins + amount });

    await reply(
      `✅ *Transferencia exitosa*\n\n`
      + `📤 Enviaste: ${formatCoins(amount)} coins\n`
      + `👤 Destinatario: ${target.nombre}\n`
      + `💳 Tu balance: ${formatCoins(user.coins - amount)} coins`
    );
  },
};
