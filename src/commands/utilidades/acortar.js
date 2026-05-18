const axios = require("axios");

module.exports = {
  name: ["acortar", "short", "url"],
  description: "🔗 Acortar una URL larga",
  category: "🔧 UTILIDADES",
  execute: async ({ reply, args }) => {
    if (!args.length) return reply("❌ Uso: .acortar <URL>\nEjemplo: .acortar https://ejemplo.com/pagina/muy/larga");
    const url = args[0];
    if (!url.startsWith("http")) return reply("❌ La URL debe comenzar con http:// o https://");
    try {
      const { data } = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`, { timeout: 8000, responseType: "text" });
      await reply(`🔗 *URL acortada*\n\nOriginal: ${url.slice(0, 50)}${url.length > 50 ? "..." : ""}\nCorta: *${data}*`);
    } catch {
      await reply(`❌ No se pudo acortar la URL. Verifica que sea válida.`);
    }
  },
};
