const axios = require("axios");

module.exports = {
  name: ["definir", "definicion", "diccionario", "def"],
  description: "📖 Definición de una palabra",
  category: "🔧 UTILIDADES",
  execute: async ({ reply, args }) => {
    if (!args.length) return reply("❌ Uso: .definir <palabra>\nEjemplo: .definir efímero");
    const palabra = args[0];
    try {
      const { data } = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/es/${encodeURIComponent(palabra)}`,
        { timeout: 8000 }
      );
      const entrada = data[0];
      const def = entrada?.meanings?.[0]?.definitions?.[0];
      if (!def) throw new Error("Sin definición");
      await reply(
        `📖 *${palabra.charAt(0).toUpperCase() + palabra.slice(1)}*\n\n` +
        `📝 ${def.definition}\n\n` +
        `${def.example ? `💡 Ejemplo: _${def.example}_` : ""}`
      );
    } catch {
      await reply(`❌ No se encontró definición para: "${palabra}"`);
    }
  },
};
