const db = require("../../database/db");
const config = require("../../config/config");
const { formatTime, formatCoins, randomInt } = require("../../utils/utils");

module.exports = {
  name: "rob",
  description: "Robar coins a otro usuario",
  category: "ECONOMÍA",
  execute: async ({ reply, msg, senderJid, args, user }) => {
    const now = Date.now();
    const lastRob = db.getCooldown(senderJid, "rob");
    const remaining = config.COOLDOWN_ROB - (now - lastRob);

    if (lastRob && remaining > 0) {
      return reply(`⏳ Espera *${formatTime(remaining)}* para robar de nuevo.`);
    }

    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    const targetJid = mentioned && mentioned[0];
    if (!targetJid) return reply("❌ Menciona a quien robar. Ej: .rob @usuario");
    if (targetJid === senderJid) return reply("❌ No puedes robarte a ti mismo.");
    if (!db.isRegistered(targetJid)) return reply("❌ Ese usuario no está registrado.");

    const target = db.getUser(targetJid);
    if (target.inventario?.find((i) => i.id === "shield")) {
      return reply(`🛡️ *${target.nombre}* tiene escudo activo. ¡El robo falló!`);
    }

    db.setCooldown(senderJid, "rob", now);
    const success = Math.random() < 0.5;

    if (success) {
      const stolen = randomInt(50, Math.min(300, target.coins));
      db.updateUser(targetJid, { coins: target.coins - stolen });
      db.updateUser(senderJid, { coins: user.coins + stolen });
      await reply(
        `🦹 *¡Robo exitoso!*\n\n`
        + `💰 Robaste ${formatCoins(stolen)} coins de *${target.nombre}*\n`
        + `💳 Tu balance: ${formatCoins(user.coins + stolen)} coins`
      );
    } else {
      const fine = randomInt(50, 200);
      db.updateUser(senderJid, { coins: Math.max(0, user.coins - fine) });
      await reply(
        `🚔 *¡Te atraparon!*\n\n`
        + `El robo a *${target.nombre}* falló.\n`
        + `💸 Perdiste ${formatCoins(fine)} coins de multa.\n`
        + `💳 Tu balance: ${formatCoins(Math.max(0, user.coins - fine))} coins`
      );
    }
  },
};
