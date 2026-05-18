const axios = require("axios");

module.exports = {
  name: ["wikipedia", "wiki", "buscar"],
  description: "📚 Buscar información en Wikipedia",
  category: "🔧 UTILIDADES",
  execute: async ({ reply, args }) => {
    if (!args.length) return reply("❌ Uso: .wikipedia <tema>\nEjemplo: .wikipedia Albert Einstein");
    const query = args.join(" ");
    try {
      const { data } = await axios.get("https://es.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(query), { timeout: 10000 });
      if (!data.extract) throw new Error("No encontrado");
      const resumen = data.extract.slice(0, 700) + (data.extract.length > 700 ? "..." : "");
      await reply(
        `📚 *${data.title}*\n\n${resumen}\n\n` +
        `🔗 ${data.content_urls?.mobile?.page || "https://es.wikipedia.org"}`
      );
    } catch {
      await reply(`❌ No se encontró información sobre: "${query}"`);
    }
  },
};
