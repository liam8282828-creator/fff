module.exports = {
  name: "restart",
  description: "Reiniciar el bot",
  category: "OWNER",
  ownerOnly: true,
  execute: async ({ reply }) => {
    await reply("🔄 Reiniciando NOVA BOT...");
    setTimeout(() => process.exit(0), 1500);
  },
};
