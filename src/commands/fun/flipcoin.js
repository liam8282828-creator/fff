module.exports = {
  name: ["flipcoin", "moneda", "cara", "seca"],
  description: "🪙 Cara o cruz",
  category: "🎮 FUN",
  execute: async ({ reply }) => {
    const resultado = Math.random() < 0.5 ? "🦅 *CARA*" : "🪙 *SECA (Cruz)*";
    await reply(`🪙 Lanzando moneda...\n\n${resultado}`);
  },
};
