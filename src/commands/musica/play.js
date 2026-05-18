module.exports = {
  name: ["play", "song", "ytmp3", "audio"],
  description: "Buscar y reproducir audio de YouTube",
  category: "MÚSICA",
  execute: async ({ reply, args }) => {
    if (!args.length) return reply("❌ Uso: .play <nombre de la canción>");
    const query = args.join(" ");
    await reply(
      `🎵 *Buscando:* ${query}\n\n`
      + `⚙️ Esta función requiere configurar una API de YouTube.\n`
      + `Instala \`yt-search\` y \`@distube/ytdl-core\` y configura el downloader en:\n`
      + `\`src/utils/musicDownloader.js\``
    );
  },
};
