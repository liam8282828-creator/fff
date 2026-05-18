module.exports = {
  name: ["encuesta", "poll", "votacion"],
  description: "📊 Crear una encuesta rápida en el grupo",
  category: "👥 ADMINISTRACIÓN DE GRUPOS",
  groupOnly: true,
  execute: async ({ sock, jid, msg, reply, args }) => {
    if (args.length < 2) return reply(
      "❌ Uso: .encuesta <pregunta> | <opción1> | <opción2> ...\n" +
      "Ejemplo: .encuesta ¿Película? | Acción | Comedia | Terror"
    );
    const partes = args.join(" ").split("|").map(p => p.trim()).filter(Boolean);
    if (partes.length < 3) return reply("❌ Necesitas al menos la pregunta y 2 opciones separadas por |");
    const [pregunta, ...opciones] = partes;
    if (opciones.length > 12) return reply("❌ Máximo 12 opciones.");
    try {
      await sock.sendMessage(jid, {
        poll: { name: pregunta, values: opciones, selectableCount: 1 },
      }, { quoted: msg });
    } catch {
      const lista = opciones.map((o, i) => `${i + 1}. ${o}`).join("\n");
      await reply(`📊 *ENCUESTA*\n\n❓ ${pregunta}\n\n${lista}\n\nResponde con el número de tu opción.`);
    }
  },
};
