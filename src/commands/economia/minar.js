const db = require("../../database/db");
const { formatCoins } = require("../../utils/utils");

const RECURSOS = [
  { nombre: "Carbón", emoji: "🪨", coins: [10, 30] },
  { nombre: "Hierro", emoji: "⚙️", coins: [30, 80] },
  { nombre: "Oro", emoji: "🥇", coins: [80, 200] },
  { nombre: "Diamante", emoji: "💎", coins: [200, 500] },
  { nombre: "Piedra", emoji: "🪨", coins: [5, 15] },
];

module.exports = {
  name: ["minar", "mine", "mineria"],
  description: "⛏️ Minar recursos para ganar coins",
  category: "💰 ECONOMÍA",
  cooldown: 60,
  execute: async ({ reply, senderJid }) => {
    const user = db.getUser(senderJid);
    const ahora = Date.now();
    const cooldown = 60 * 1000;
    if (user.lastMine && ahora - user.lastMine < cooldown) {
      const resto = Math.ceil((cooldown - (ahora - user.lastMine)) / 1000);
      return reply(`⛏️ Ya minaste. Espera *${resto}s* para volver a minar.`);
    }
    const recurso = RECURSOS[Math.floor(Math.random() * RECURSOS.length)];
    const ganado = Math.floor(Math.random() * (recurso.coins[1] - recurso.coins[0])) + recurso.coins[0];
    db.updateUser(senderJid, { coins: user.coins + ganado, lastMine: ahora });
    await reply(
      `⛏️ *¡Minería exitosa!*\n\n` +
      `${recurso.emoji} Encontraste: *${recurso.nombre}*\n` +
      `💰 Ganaste: +${formatCoins(ganado)} coins\n` +
      `💳 Saldo: ${formatCoins(user.coins + ganado)}`
    );
  },
};
