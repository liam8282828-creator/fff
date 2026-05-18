module.exports = {
  name: ["tagall", "everyone", "todos"],
  description: "Mencionar a todos en el grupo",
  category: "GRUPOS",
  execute: async ({ sock, jid, args, reply }) => {
    if (!jid.endsWith("@g.us")) return reply("❌ Solo funciona en grupos.");
    try {
      const meta = await sock.groupMetadata(jid);
      const participants = meta.participants.map((p) => p.id);
      const mentions = participants.map((p) => `@${p.split("@")[0]}`).join(" ");
      const msg = args.length ? args.join(" ") : "📢 Atención!";
      await sock.sendMessage(jid, { text: `${msg}\n\n${mentions}`, mentions: participants });
    } catch {
      await reply("❌ No se pudo obtener la lista del grupo.");
    }
  },
};
