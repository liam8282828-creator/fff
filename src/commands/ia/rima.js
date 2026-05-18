module.exports = {
  name: ["rima", "poema", "verso"],
  description: "🎭 Crear una rima o poema con tu texto",
  category: "🧠 INTELIGENCIA ARTIFICIAL",
  execute: async ({ reply, args }) => {
    if (!args.length) return reply("❌ Uso: .rima <palabra o frase>");
    const texto = args.join(" ");

    if (!process.env.OPENAI_API_KEY) {
      return reply(`🎭 Necesitas OPENAI_API_KEY para generar rimas con IA.\n\nPalabra: _${texto}_\n\nAgrega OPENAI_API_KEY en tu .env`);
    }

    try {
      const axios = require("axios");
      const { data } = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: `Escribe un pequeño poema o rima de 4 versos en español sobre: "${texto}". Solo el poema, sin explicaciones.` }],
          max_tokens: 200,
        },
        { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }, timeout: 15000 }
      );
      await reply(`🎭 *Poema para "${texto}"*\n\n${data.choices[0].message.content}`);
    } catch (err) {
      await reply(`❌ Error: ${err.message}`);
    }
  },
};
