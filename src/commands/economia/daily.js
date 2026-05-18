const db = require("../../database/db");
const config = require("../../config/config");
const { formatTime, formatCoins, randomInt } = require("../../utils/utils");

module.exports = {
  name: ["daily", "diario"],
  description: "Reclama tu recompensa diaria",
  category: "ECONOMÍA",
  execute: async ({ reply, senderJid, user }) => {
    const now = Date.now();
    const lastDaily = db.getCooldown(senderJid, "daily");
    const remaining = config.COOLDOWN_DAILY - (now - lastDaily);

    if (lastDaily && remaining > 0) {
      return reply(`⏳ Ya reclamaste hoy.\nVuelve en *${formatTime(remaining)}*.`);
    }

    const earned = randomInt(500, 1500);
    db.setCooldown(senderJid, "daily", now);
    db.updateUser(senderJid, { coins: user.coins + earned });

    await reply(
      `🎁 *¡Recompensa Diaria!*\n\n`
      + `💰 Ganaste: +${formatCoins(earned)} coins\n`
      + `💳 Balance: ${formatCoins(user.coins + earned)} coins\n\n`
      + `Vuelve mañana para tu próxima recompensa.`
    );
  },
};
