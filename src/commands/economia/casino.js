const db = require("../../database/db");
const { formatCoins } = require("../../utils/utils");

module.exports = {
  name: ["casino", "apostar", "gamble", "bet"],
  description: "🎰 Apostar coins en el casino",
  category: "💰 ECONOMÍA",
  execute: async ({ reply, senderJid, args }) => {
    const user = db.getUser(senderJid);
    const amount = args[0] === "todo" ? user.coins : parseInt(args[0]);
    if (!amount || isNaN(amount) || amount <= 0) return reply("❌ Uso: .casino <cantidad>");
    if (amount > user.coins) return reply(`❌ No tienes suficientes coins. Tienes: ${formatCoins(user.coins)}`);
    if (amount < 10) return reply("❌ La apuesta mínima es 10 coins.");

    const suerte = Math.random();
    let resultado, ganancia;

    if (suerte < 0.05) {
      ganancia = amount * 5;
      resultado = `🎉 *¡JACKPOT!* Ganaste x5\n+${formatCoins(ganancia)} coins`;
    } else if (suerte < 0.35) {
      ganancia = amount * 2;
      resultado = `✅ *¡Ganaste!* Doble\n+${formatCoins(ganancia)} coins`;
    } else if (suerte < 0.5) {
      ganancia = Math.floor(amount * 0.5);
      resultado = `🟡 *Empate parcial*\n+${formatCoins(ganancia)} coins`;
    } else {
      ganancia = -amount;
      resultado = `❌ *Perdiste*\n-${formatCoins(amount)} coins`;
    }

    db.updateUser(senderJid, { coins: user.coins + ganancia });
    await reply(
      `🎰 *Casino NOVA*\n\n` +
      `💸 Apostaste: ${formatCoins(amount)} coins\n` +
      `${resultado}\n\n` +
      `💳 Nuevo saldo: ${formatCoins(user.coins + ganancia)} coins`
    );
  },
};
