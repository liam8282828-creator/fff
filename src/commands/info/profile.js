const db = require("../../database/db");
const { cleanJid, levelFromXp, formatCoins } = require("../../utils/utils");

module.exports = {
  name: ["profile", "perfil"],
  description: "Ver tu perfil",
  category: "INFO",
  execute: async ({ reply, senderJid, user }) => {
    if (!user) return reply("❌ No estás registrado. Usa .reg nombre.edad");
    const nivel = levelFromXp(user.xp);
    const text = `👤 *PERFIL — ${user.nombre}*\n\n`
      + `📱 Número: ${cleanJid(senderJid)}\n`
      + `🎂 Edad: ${user.edad}\n`
      + `💰 Coins: ${formatCoins(user.coins)}\n`
      + `⭐ XP: ${user.xp}\n`
      + `🏆 Nivel: ${nivel}\n`
      + `🎒 Items: ${user.inventario.length}\n`
      + `📅 Registrado: ${new Date(user.createdAt).toLocaleDateString("es-ES")}`;
    await reply(text);
  },
};
