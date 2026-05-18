const db = require("../../database/db");
const { formatCoins } = require("../../utils/utils");

const SIMBOLOS = ["🍒", "🍋", "🍊", "⭐", "💎", "🔔", "7️⃣"];

module.exports = {
  name: ["slots", "tragaperras", "slot"],
  description: "🎰 Jugar en la máquina tragaperras",
  category: "💰 ECONOMÍA",
  execute: async ({ reply, senderJid, args }) => {
    const user = db.getUser(senderJid);
    const amount = parseInt(args[0]) || 50;
    if (amount < 10) return reply("❌ Apuesta mínima: 10 coins.");
    if (amount > user.coins) return reply(`❌ No tienes suficientes coins. Tienes: ${formatCoins(user.coins)}`);

    const s = () => SIMBOLOS[Math.floor(Math.random() * SIMBOLOS.length)];
    const r = [s(), s(), s()];

    let ganancia = -amount;
    let msg = "❌ *No hay coincidencias*";

    if (r[0] === r[1] && r[1] === r[2]) {
      if (r[0] === "💎") { ganancia = amount * 10; msg = "💎 *¡TRIPLE DIAMANTE! x10*"; }
      else if (r[0] === "7️⃣") { ganancia = amount * 7; msg = "7️⃣ *¡TRIPLE 7! x7*"; }
      else { ganancia = amount * 3; msg = "⭐ *¡Triple! x3*"; }
    } else if (r[0] === r[1] || r[1] === r[2] || r[0] === r[2]) {
      ganancia = Math.floor(amount * 0.5);
      msg = "🟡 *Par* +50%";
    }

    db.updateUser(senderJid, { coins: user.coins + ganancia });
    await reply(
      `🎰 *SLOTS*\n\n` +
      `┌ ${r[0]} │ ${r[1]} │ ${r[2]} ┐\n\n` +
      `${msg}\n` +
      `${ganancia >= 0 ? "+" : ""}${formatCoins(ganancia)} coins\n\n` +
      `💳 Saldo: ${formatCoins(user.coins + ganancia)}`
    );
  },
};
