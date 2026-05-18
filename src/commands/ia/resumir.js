module.exports = {
  name: ["resumir", "resumen", "summary"],
  description: "📝 Resumir un texto con IA",
  category: "🧠 INTELIGENCIA ARTIFICIAL",
  execute: async ({ reply, args, msg }) => {
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const textoQ = quoted?.conversation || quoted?.extendedTextMessage?.text;
    const texto = textoQ || args.join(" ");
    if (!texto || texto.length < 50) return reply("❌ El texto es demasiado corto. Responde a un mensaje largo o escribe el texto.");

    if (!process.env.OPENAI_API_KEY) {
      const palabras = texto.trim().split(/\s+/);
      const resumen = palabras.slice(0, Math.floor(palabras.length * 0.3)).join(" ") + "...";
      return reply(`📝 *Resumen* (básico, sin OPENAI_API_KEY):\n\n${resumen}`);
    }

    try {
      const axios = require("axios");
      const { data } = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        { model: "gpt-3.5-turbo", messages: [{ role: "user", content: `Resume en 3-5 oraciones en español: ${texto}` }], max_tokens: 300 },
        { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }, timeout: 20000 }
      );
      await reply(`📝 *Resumen*\n\n${data.choices[0].message.content}`);
    } catch (err) {
      await reply(`❌ Error al resumir: ${err.message}`);
    }
  },
};
