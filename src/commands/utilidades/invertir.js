module.exports = {
  name: ["invertir", "reverse", "voltear"],
  description: "🔄 Invertir un texto",
  category: "🔧 UTILIDADES",
  execute: async ({ reply, args }) => {
    if (!args.length) return reply("❌ Uso: .invertir <texto>");
    const texto = args.join(" ");
    const invertido = texto.split("").reverse().join("");
    await reply(`🔄 *Texto invertido*\n\nOriginal: ${texto}\nInvertido: *${invertido}*`);
  },
};
