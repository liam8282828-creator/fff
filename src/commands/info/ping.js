module.exports = {
  name: "ping",
  description: "Verifica que el bot responde",
  category: "INFO",
  execute: async ({ reply }) => {
    const start = Date.now();
    await reply("🏓 Pong!");
    const ms = Date.now() - start;
    await reply(`⚡ *Latencia:* ${ms}ms`);
  },
};
