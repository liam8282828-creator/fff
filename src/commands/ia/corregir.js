module.exports = {
  name: ["corregir", "grammar", "ortografia"],
  description: "✏️ Corregir gramática y ortografía con IA",
  category: "🧠 INTELIGENCIA ARTIFICIAL",
  execute: async ({ reply, args, msg }) => {
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const textoQ = quoted?.conversation || quoted?.extendedTextMessage?.text;
    const texto = textoQ || args.join(" ");
    if (!texto) return reply("❌ Escribe o responde a un texto para corregir.");

    if (!process.env.OPENAI_API_KEY) {
      return reply(`✏️ Necesitas OPENAI_API_KEY en tu .env para usar este comando.\n\nTexto recibido:\n_${texto}_`);
    }

    try {
      const axios = require("axios");
      const { data } = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        { model: "gpt-3.5-turbo", messages: [{ role: "user", content: `Corrige la gramática y ortografía de este texto en español y devuelve solo el texto corregido: "${texto}"` }], max_tokens: 500 },
        { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }, timeout: 15000 }
      );
      const corregido = data.choices[0].message.content;
      await reply(`✏️ *Texto corregido*\n\n*Original:* ${texto}\n\n*Corregido:* ${corregido}`);
    } catch (err) {
      await reply(`❌ Error: ${err.message}`);
    }
  },
};
