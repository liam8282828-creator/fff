const db = require("../../database/db");
const { formatCoins } = require("../../utils/utils");

module.exports = {
  name: "addcoins",
  description: "🪙 Dar coins a un usuario específico",
  category: "👑 OWNER & CREADOR (EXCLUSIVOS)",
  ownerOnly: true,
  execute: async ({ reply, msg, args }) => {
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    const targetJid = mentioned?.[0] || (args[0] && `${args[0].replace(/[^0-9]/g, "")}@s.whatsapp.net`);
    const amount = parseInt(args[mentioned?.length ? 0 : 1]);

    if (!targetJid || isNaN(amount) || amount <= 0) {
      return reply("❌ Uso: .addcoins @usuario cantidad\nEjemplo: .addcoins @Nova 1000");
    }
    if (!db.isRegistered(targetJid)) return reply("❌ Ese usuario no está registrado.");

    const target = db.getUser(targetJid);
    db.updateUser(targetJid, { coins: target.coins + amount });

    await reply(
      `🪙 *Coins añadidos*\n\n` +
      `👤 Usuario: ${target.nombre}\n` +
      `💰 Añadido: +${formatCoins(amount)} coins\n` +
      `💳 Nuevo balance: ${formatCoins(target.coins + amount)} coins`
    );
  },
};
