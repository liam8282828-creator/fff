const db = require("../../database/db");
const config = require("../../config/config");
const { formatTime, formatCoins, randomInt, levelFromXp } = require("../../utils/utils");

const TRABAJOS = [
  "programaste una app",
  "repartiste pizzas",
  "manejaste un taxi",
  "vendiste limonadas",
  "enseñaste clases",
  "diseñaste logos",
  "transmitiste en stream",
  "vendiste fotos",
  "escribiste artículos",
  "reparaste celulares",
];

module.exports = {
  name: ["trabajar", "work"],
  description: "Trabaja para ganar coins",
  category: "ECONOMÍA",
  execute: async ({ reply, senderJid, user }) => {
    const now = Date.now();
    const lastWorked = db.getCooldown(senderJid, "trabajar");
    const remaining = config.COOLDOWN_TRABAJAR - (now - lastWorked);

    if (lastWorked && remaining > 0) {
      return reply(`⏳ Ya trabajaste.\nEspera *${formatTime(remaining)}* para volver a trabajar.`);
    }

    const earned = randomInt(100, 500);
    const xpEarned = randomInt(10, 30);
    const trabajo = TRABAJOS[Math.floor(Math.random() * TRABAJOS.length)];

    db.setCooldown(senderJid, "trabajar", now);
    const newCoins = user.coins + earned;
    const newXp = user.xp + xpEarned;
    db.updateUser(senderJid, { coins: newCoins, xp: newXp });

    const nivelAntes = levelFromXp(user.xp);
    const nivelDespues = levelFromXp(newXp);
    const levelUp = nivelDespues > nivelAntes;

    let text = `💼 *¡Trabajaste y ganaste!*\n\n`
      + `📋 Actividad: ${trabajo}\n`
      + `💰 Ganaste: +${formatCoins(earned)} coins\n`
      + `⭐ XP: +${xpEarned}\n`
      + `💳 Balance: ${formatCoins(newCoins)} coins`;

    if (levelUp) text += `\n\n🎉 ¡Subiste al nivel ${nivelDespues}!`;

    await reply(text);
  },
};
