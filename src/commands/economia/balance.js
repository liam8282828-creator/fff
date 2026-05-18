const { formatCoins, levelFromXp, xpForNextLevel } = require("../../utils/utils");

module.exports = {
  name: ["balance", "bal", "coins"],
  description: "Ver tu balance de coins",
  category: "ECONOMÍA",
  execute: async ({ reply, user }) => {
    const nivel = levelFromXp(user.xp);
    const nextXp = xpForNextLevel(nivel + 1);
    await reply(
      `💰 *BALANCE DE ${user.nombre.toUpperCase()}*\n\n`
      + `💳 Coins: ${formatCoins(user.coins)}\n`
      + `⭐ XP: ${user.xp} / ${Math.ceil(nextXp)}\n`
      + `🏆 Nivel: ${nivel}`
    );
  },
};
