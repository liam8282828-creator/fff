const db = require("../../database/db");
const { formatCoins } = require("../../utils/utils");

const ANIMALES = [
  { nombre: "Conejo", emoji: "🐇", coins: [10, 40] },
  { nombre: "Ciervo", emoji: "🦌", coins: [40, 100] },
  { nombre: "Jabalí", emoji: "🐗", coins: [100, 250] },
  { nombre: "Oso", emoji: "🐻", coins: [250, 600] },
  { nombre: "Faisán", emoji: "🦢", coins: [30, 80] },
  { nombre: "Dragón mítico", emoji: "🐉", coins: [600, 1500] },
];

module.exports = {
  name: ["cazar", "hunt", "caza"],
  description: "🏹 Cazar animales para obtener coins",
  category: "💰 ECONOMÍA",
  execute: async ({ reply, senderJid }) => {
    const user = db.getUser(senderJid);
    const ahora = Date.now();
    const cooldown = 90 * 1000;
    if (user.lastHunt && ahora - user.lastHunt < cooldown) {
      const resto = Math.ceil((cooldown - (ahora - user.lastHunt)) / 1000);
      return reply(`🏹 Necesitas recargar el arco. Espera *${resto}s*.`);
    }
    const fallo = Math.random() < 0.2;
    if (fallo) {
      db.updateUser(senderJid, { lastHunt: ahora });
      return reply("🏹 ¡Fallaste! El animal escapó.\nIntenta de nuevo en 90s.");
    }
    const animal = ANIMALES[Math.floor(Math.random() * ANIMALES.length)];
    const ganado = Math.floor(Math.random() * (animal.coins[1] - animal.coins[0])) + animal.coins[0];
    db.updateUser(senderJid, { coins: user.coins + ganado, lastHunt: ahora });
    await reply(
      `🏹 *¡Caza exitosa!*\n\n` +
      `${animal.emoji} Cazaste: *${animal.nombre}*\n` +
      `💰 Ganaste: +${formatCoins(ganado)} coins\n` +
      `💳 Saldo: ${formatCoins(user.coins + ganado)}`
    );
  },
};
