const db = require("../../database/db");
const { formatCoins } = require("../../utils/utils");

module.exports = {
  name: ["depositar", "deposit"],
  description: "🏦 Depositar coins al banco",
  category: "💰 ECONOMÍA",
  execute: async ({ reply, senderJid, args }) => {
    const user = db.getUser(senderJid);
    const amount = args[0] === "todo" ? user.coins : parseInt(args[0]);
    if (!amount || isNaN(amount) || amount <= 0)
      return reply("❌ Uso: .depositar <cantidad> o .depositar todo");
    if (amount > user.coins)
      return reply(`❌ No tienes suficientes coins. Billetera: ${formatCoins(user.coins)}`);
    db.updateUser(senderJid, { coins: user.coins - amount, banco: (user.banco || 0) + amount });
    await reply(`🏦 Depositaste *${formatCoins(amount)} coins* al banco.\nSaldo banco: ${formatCoins((user.banco || 0) + amount)}`);
  },
};
