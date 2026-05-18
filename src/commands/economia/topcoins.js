const db = require("../../database/db");
const { formatCoins } = require("../../utils/utils");

const MEDALS = ["🥇", "🥈", "🥉"];

module.exports = {
  name: ["topcoins", "leaderboard", "top"],
  description: "Top de usuarios con más coins",
  category: "ECONOMÍA",
  execute: async ({ reply }) => {
    const top = db.getTopCoins(10);
    if (!top.length) return reply("📊 Aún no hay usuarios registrados.");

    let text = `🏆 *TOP COINS — NOVA BOT*\n\n`;
    top.forEach((u, i) => {
      const medal = MEDALS[i] || `#${i + 1}`;
      text += `${medal} *${u.nombre}* — ${formatCoins(u.coins)} coins\n`;
    });
    await reply(text);
  },
};
