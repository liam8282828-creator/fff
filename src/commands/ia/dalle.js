module.exports = {
  name: ["dalle", "dall-e", "imagen"],
  description: "🎨 Generar imágenes con DALL·E",
  category: "🧠 INTELIGENCIA ARTIFICIAL",
  execute: async ({ reply, args, sock, jid, msg }) => {
    if (!args.length) return reply("❌ Uso: .dalle <descripción de la imagen>");
    const prompt = args.join(" ");

    if (!process.env.OPENAI_API_KEY) {
      return reply(
        `🎨 *DALL·E*\n\nPrompt: ${prompt}\n\n` +
        `⚙️ Para activar la generación de imágenes, agrega en tu .env:\n` +
        `OPENAI_API_KEY=sk-...\n\n` +
        `Obtén tu clave en: platform.openai.com`
      );
    }

    try {
      await reply(`🎨 Generando imagen para: _${prompt}_\nEspera un momento...`);
      const axios = require("axios");
      const { data } = await axios.post(
        "https://api.openai.com/v1/images/generations",
        { model: "dall-e-3", prompt, n: 1, size: "1024x1024" },
        {
          headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
          timeout: 30000,
        }
      );
      const url = data?.data?.[0]?.url;
      if (!url) throw new Error("Sin URL de imagen");
      await sock.sendMessage(jid, { image: { url }, caption: `🎨 *DALL·E 3*\n\n_${prompt}_` }, { quoted: msg });
    } catch (err) {
      await reply(`❌ Error generando imagen: ${err.message}`);
    }
  },
};
