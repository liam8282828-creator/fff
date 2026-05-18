const db = require("../../database/db");
const { formatCoins } = require("../../utils/utils");

const PECES = [
  { nombre: "Pez globo", emoji: "🐡", coins: [5, 20] },
  { nombre: "Salmón", emoji: "🐟", coins: [20, 60] },
  { nombre: "Atún", emoji: "🐠", coins: [60, 150] },
  { nombre: "Tiburón", emoji: "🦈", coins: [150, 400] },
  { nombre: "Bota vieja", emoji: "👟", coins: [1, 5] },
  { nombre: "Cofre del mar", emoji: "💎", coins: [400, 1000] },
];

module.exports = {
  name: ["pescar", "fish", "pesca"],
  description: "🎣 Pescar para obtener coins",
  category: "💰 ECONOMÍA",
  execute: async ({ reply, senderJid }) => {
    const user = db.getUser(senderJid);
    const ahora = Date.now();
    const cooldown = 45 * 1000;
    if (user.lastFish && ahora - user.lastFish < cooldown) {
      const resto = Math.ceil((cooldown - (ahora - user.lastFish)) / 1000);
      return reply(`🎣 La línea todavía está en el agua. Espera *${resto}s*.`);
    }
    const pez = PECES[Math.floor(Math.random() * PECES.length)];
    const ganado = Math.floor(Math.random() * (pez.coins[1] - pez.coins[0])) + pez.coins[0];
    db.updateUser(senderJid, { coins: user.coins + ganado, lastFish: ahora });
    await reply(
      `🎣 *¡Pescaste algo!*\n\n` +
      `${pez.emoji} Atrapaste: *${pez.nombre}*\n` +
      `💰 Valor: +${formatCoins(ganado)} coins\n` +
      `💳 Saldo: ${formatCoins(user.coins + ganado)}`
    );
  },
};
