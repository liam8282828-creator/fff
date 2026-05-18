const db = require("../../database/db");
const { formatCoins } = require("../../utils/utils");

module.exports = {
  name: ["vender", "sell"],
  description: "💸 Vender un item de tu inventario",
  category: "💰 ECONOMÍA",
  execute: async ({ reply, senderJid, args }) => {
    const user = db.getUser(senderJid);
    const inv = user.inventario || {};
    if (!args.length) {
      const items = Object.entries(inv).filter(([, v]) => v > 0);
      if (!items.length) return reply("🎒 Tu inventario está vacío. No tienes nada que vender.");
      const lista = items.map(([k, v]) => `• ${k} x${v}`).join("\n");
      return reply(`🎒 *Tu inventario:*\n\n${lista}\n\nUso: .vender <item> [cantidad]`);
    }
    const itemNombre = args[0].toLowerCase();
    const cantidad = parseInt(args[1]) || 1;
    const key = Object.keys(inv).find((k) => k.toLowerCase().includes(itemNombre));
    if (!key || inv[key] < cantidad) return reply(`❌ No tienes suficientes "${itemNombre}" en tu inventario.`);
    const precio = Math.floor(Math.random() * 80 + 20) * cantidad;
    inv[key] -= cantidad;
    if (inv[key] <= 0) delete inv[key];
    db.updateUser(senderJid, { coins: user.coins + precio, inventario: inv });
    await reply(
      `💸 *Venta exitosa*\n\n` +
      `📦 Item: ${key} x${cantidad}\n` +
      `💰 Recibiste: +${formatCoins(precio)} coins\n` +
      `💳 Saldo: ${formatCoins(user.coins + precio)}`
    );
  },
};
