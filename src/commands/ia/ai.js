const axios = require("axios");

module.exports = {
  name: ["ai", "chat", "gpt", "ask", "pregunta"],
  description: "Hablar con IA",
  category: "IA",
  execute: async ({ reply, args }) => {
    if (!args.length) return reply("❌ Uso: .ai <pregunta>");
    const query = args.join(" ");

    try {
      const res = await axios.get(
        `https://api.simsimi.net/v2/?text=${encodeURIComponent(query)}&lc=es`,
        { timeout: 10000 }
      );
      const answer = res.data?.success || res.data?.message;
      if (answer) return reply(`🤖 ${answer}`);
      throw new Error("Sin respuesta");
    } catch {
      await reply(
        `🤖 *NOVA IA*\n\n`
        + `Pregunta: ${query}\n\n`
        + `Para respuestas de IA reales, configura tu OpenAI API Key en .env:\n`
        + `OPENAI_API_KEY=sk-...\n\n`
        + `Y activa el módulo en \`src/utils/aiClient.js\``
      );
    }
  },
};
