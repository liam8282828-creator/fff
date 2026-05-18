module.exports = {
  name: "shutdown",
  description: "Apagar el bot",
  category: "OWNER",
  ownerOnly: true,
  execute: async ({ reply }) => {
    await reply("🛑 Apagando NOVA BOT... Hasta pronto.");
    setTimeout(() => process.exit(1), 1500);
  },
};
