module.exports = {
  name: ["inventario", "inv", "inventory"],
  description: "Ver tu inventario",
  category: "ECONOMÍA",
  execute: async ({ reply, user }) => {
    if (!user.inventario || user.inventario.length === 0) {
      return reply("🎒 Tu inventario está vacío.\nCompra items en *.tienda*");
    }
    let text = `🎒 *INVENTARIO DE ${user.nombre.toUpperCase()}*\n\n`;
    user.inventario.forEach((item, i) => {
      text += `${i + 1}. *${item.name}*\n`;
      text += `   Adquirido: ${new Date(item.adquiredAt).toLocaleDateString("es-ES")}\n\n`;
    });
    await reply(text);
  },
};
