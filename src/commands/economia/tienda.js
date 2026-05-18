const config = require("../../config/config");
const db = require("../../database/db");
const { formatCoins } = require("../../utils/utils");

module.exports = {
  name: ["tienda", "shop", "store"],
  description: "Ver la tienda del bot",
  category: "ECONOMÍA",
  execute: async ({ reply, args, user, senderJid }) => {
    if (args[0] === "comprar" || args[0] === "buy") {
      const itemId = args[1];
      const item = config.SHOP_ITEMS.find((i) => i.id === itemId);
      if (!item) return reply("❌ Item no encontrado. Usa *.tienda* para ver los disponibles.");
      if (user.coins < item.price) return reply(`❌ Necesitas ${formatCoins(item.price)} coins. Tienes ${formatCoins(user.coins)}.`);
      const inv = user.inventario || [];
      inv.push({ id: item.id, name: item.name, adquiredAt: new Date().toISOString() });
      db.updateUser(senderJid, { coins: user.coins - item.price, inventario: inv });
      return reply(`✅ Compraste *${item.name}* por ${formatCoins(item.price)} coins!`);
    }

    let text = `🏪 *TIENDA ${config.BOT_NAME}*\n\n`;
    config.SHOP_ITEMS.forEach((item) => {
      text += `🔹 *${item.name}*\n`;
      text += `   ID: \`${item.id}\`\n`;
      text += `   Precio: ${formatCoins(item.price)} coins\n`;
      text += `   ${item.description}\n\n`;
    });
    text += `Comprar: *.tienda comprar <id>*`;
    await reply(text);
  },
};
