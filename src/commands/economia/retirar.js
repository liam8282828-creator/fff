const db = require("../../database/db");
const { formatCoins } = require("../../utils/utils");

module.exports = {
  name: ["retirar", "withdraw"],
  description: "🏦 Retirar coins del banco",
  category: "💰 ECONOMÍA",
  execute: async ({ reply, senderJid, args }) => {
    const user = db.getUser(senderJid);
    const banco = user.banco || 0;
    const amount = args[0] === "todo" ? banco : parseInt(args[0]);
    if (!amount || isNaN(amount) || amount <= 0)
      return reply("❌ Uso: .retirar <cantidad> o .retirar todo");
    if (amount > banco)
      return reply(`❌ No tienes suficiente en el banco. Saldo: ${formatCoins(banco)}`);
    db.updateUser(senderJid, { coins: user.coins + amount, banco: banco - amount });
    await reply(`💳 Retiraste *${formatCoins(amount)} coins* del banco.\nBilletera: ${formatCoins(user.coins + amount)}`);
  },
};
