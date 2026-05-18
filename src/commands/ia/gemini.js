module.exports = {
  name: "gemini",
  description: "🚀 Consultas avanzadas con Gemini AI",
  category: "🧠 INTELIGENCIA ARTIFICIAL",
  execute: async ({ reply, args }) => {
    if (!args.length) return reply("❌ Uso: .gemini <pregunta>");
    const query = args.join(" ");

    if (!process.env.GEMINI_API_KEY) {
      return reply(
        `🚀 *Gemini AI*\n\nPregunta: ${query}\n\n` +
        `⚙️ Para activar Gemini, agrega en tu .env:\n` +
        `GEMINI_API_KEY=tu-clave-de-google-ai-studio\n\n` +
        `Obtén tu clave en: aistudio.google.com`
      );
    }

    try {
      const axios = require("axios");
      const { data } = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
        { contents: [{ parts: [{ text: query }] }] },
        { timeout: 20000 }
      );
      const respuesta = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!respuesta) throw new Error("Sin respuesta de Gemini");
      await reply(`🚀 *Gemini AI*\n\n${respuesta}`);
    } catch (err) {
      await reply(`❌ Error con Gemini: ${err.message}`);
    }
  },
};
