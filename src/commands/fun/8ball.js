const RESPUESTAS = [
  "✅ Sí, definitivamente.", "✅ Sin duda alguna.", "✅ Puedes contar con ello.",
  "✅ Las señales apuntan que sí.", "✅ Todo indica que sí.",
  "🟡 Vuelve a preguntar más tarde.", "🟡 No puedo predecirlo ahora.",
  "🟡 Concéntrate y pregunta de nuevo.", "🟡 Mejor no te digo.",
  "❌ No lo creo.", "❌ Mis fuentes dicen no.", "❌ Las perspectivas no son buenas.",
  "❌ Definitivamente no.", "❌ Muy dudoso.",
];

module.exports = {
  name: ["8ball", "bola8", "bola"],
  description: "🎱 La bola mágica responde tu pregunta",
  category: "🎮 FUN",
  execute: async ({ reply, args }) => {
    if (!args.length) return reply("❌ Haz una pregunta.\nEjemplo: .8ball ¿Voy a ganar?");
    const pregunta = args.join(" ");
    const r = RESPUESTAS[Math.floor(Math.random() * RESPUESTAS.length)];
    await reply(`🎱 *Bola Mágica*\n\n❓ ${pregunta}\n\n${r}`);
  },
};
