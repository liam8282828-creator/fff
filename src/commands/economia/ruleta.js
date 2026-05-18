const db = require("../../database/db");
const { formatCoins } = require("../../utils/utils");

module.exports = {
  name: ["ruleta", "roulette"],
  description: "🎡 Jugar a la ruleta (rojo/negro/número)",
  category: "💰 ECONOMÍA",
  execute: async ({ reply, senderJid, args }) => {
    if (args.length < 2) return reply(
      "❌ Uso: .ruleta <apuesta> <rojo|negro|0-36>\n" +
      "Ejemplo: .ruleta 100 rojo\n" +
      "Ejemplo: .ruleta 200 17"
    );
    const user = db.getUser(senderJid);
    const amount = parseInt(args[0]);
    const apuesta = args[1].toLowerCase();
    if (isNaN(amount) || amount <= 0) return reply("❌ Cantidad inválida.");
    if (amount > user.coins) return reply(`❌ Coins insuficientes. Tienes: ${formatCoins(user.coins)}`);

    const numero = Math.floor(Math.random() * 37);
    const ROJOS = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
    const esRojo = ROJOS.includes(numero);
    const color = numero === 0 ? "🟢" : esRojo ? "🔴" : "⚫";

    let ganancia = -amount;
    if (apuesta === "rojo" && esRojo) ganancia = amount;
    else if (apuesta === "negro" && !esRojo && numero !== 0) ganancia = amount;
    else if (parseInt(apuesta) === numero) ganancia = amount * 35;

    db.updateUser(senderJid, { coins: user.coins + ganancia });
    await reply(
      `🎡 *Ruleta NOVA*\n\n` +
      `${color} Número: *${numero}*\n\n` +
      `Tu apuesta: ${apuesta} (${formatCoins(amount)})\n` +
      `${ganancia > 0 ? `✅ Ganaste +${formatCoins(ganancia)}` : `❌ Perdiste -${formatCoins(amount)}`}\n\n` +
      `💳 Saldo: ${formatCoins(user.coins + ganancia)}`
    );
  },
};
