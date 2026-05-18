module.exports = {
  name: "add",
  description: "Agregar un usuario al grupo",
  category: "GRUPOS",
  execute: async ({ sock, jid, args, reply }) => {
    if (!args[0]) return reply("❌ Uso: .add número");
    if (!jid.endsWith("@g.us")) return reply("❌ Solo funciona en grupos.");
    const num = `${args[0].replace(/[^0-9]/g, "")}@s.whatsapp.net`;
    try {
      await sock.groupParticipantsUpdate(jid, [num], "add");
      await reply(`✅ Agregado: ${args[0]}`);
    } catch {
      await reply("❌ No se pudo agregar. Verifica el número o mis permisos.");
    }
  },
};
