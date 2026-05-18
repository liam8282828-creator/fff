module.exports = {
  name: ["lyrics", "letra"],
  description: "Buscar letra de una canción",
  category: "MÚSICA",
  execute: async ({ reply, args }) => {
    if (!args.length) return reply("❌ Uso: .lyrics <canción>");
    const query = args.join(" ");
    await reply(
      `🎤 *Letra de:* ${query}\n\n`
      + `⚙️ Conecta la API Genius para letras.\n`
      + `Configura tu GENIUS_API_KEY en .env y el módulo en:\n`
      + `\`src/utils/lyrics.js\``
    );
  },
};
