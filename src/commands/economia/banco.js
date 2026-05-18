const db = require("../../database/db");
const { formatCoins } = require("../../utils/utils");

module.exports = {
  name: ["banco", "bank", "savings"],
  description: "🏦 Ver tu saldo bancario",
  category: "💰 ECONOMÍA",
  execute: async ({ reply, senderJid }) => {
    const user = db.getUser(senderJid);
    const banco = user.banco || 0;
    const billetera = user.coins || 0;
    await reply(
      `🏦 *Banco de ${user.nombre}*\n\n` +
      `💳 Billetera: ${formatCoins(billetera)} coins\n` +
      `🏦 Banco: ${formatCoins(banco)} coins\n` +
      `💰 Total: ${formatCoins(billetera + banco)} coins\n\n` +
      `_Usa .depositar y .retirar para mover fondos_`
    );
  },
};
