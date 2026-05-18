module.exports = {
  name: ["dado", "dice", "d6"],
  description: "🎲 Tirar un dado (1-6 o personalizado)",
  category: "🎮 FUN",
  execute: async ({ reply, args }) => {
    const caras = parseInt(args[0]) || 6;
    if (caras < 2 || caras > 1000) return reply("❌ El dado debe tener entre 2 y 1000 caras.");
    const resultado = Math.floor(Math.random() * caras) + 1;
    await reply(`🎲 Tiraste un dado de *${caras}* caras\n\nResultado: *${resultado}*`);
  },
};
