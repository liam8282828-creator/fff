module.exports = {
  name: ["translate", "traducir"],
  description: "Traducir texto (Ej: .translate es Hola world)",
  category: "IA",
  execute: async ({ reply, args }) => {
    const lang = args[0];
    const text = args.slice(1).join(" ");
    if (!lang || !text) return reply("❌ Uso: .translate <idioma> <texto>\nEjemplo: .translate es Hello world");
    await reply(
      `🌐 *Traducción*\n\nConfigura Google Translate API en .env:\n`
      + `GOOGLE_API_KEY=...\n\nMódulo disponible en \`src/utils/translator.js\``
    );
  },
};
