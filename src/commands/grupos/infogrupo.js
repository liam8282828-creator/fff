module.exports = {
  name: ["infogrupo", "groupinfo", "grupoinfo"],
  description: "ℹ️ Ver información completa del grupo",
  category: "👥 ADMINISTRACIÓN DE GRUPOS",
  groupOnly: true,
  execute: async ({ sock, jid, reply }) => {
    try {
      const meta = await sock.groupMetadata(jid);
      const admins = meta.participants.filter(p => p.admin).map(p => `@${p.id.split("@")[0]}`);
      const total = meta.participants.length;
      const creado = meta.creation ? new Date(meta.creation * 1000).toLocaleDateString("es-ES") : "Desconocido";

      await reply(
        `ℹ️ *INFORMACIÓN DEL GRUPO*\n\n` +
        `📌 Nombre: *${meta.subject}*\n` +
        `👥 Miembros: *${total}*\n` +
        `👑 Admins: ${admins.join(", ") || "Ninguno"}\n` +
        `📅 Creado: ${creado}\n` +
        `🔗 JID: ${jid}\n` +
        `📝 Descripción:\n${meta.desc || "Sin descripción"}`
      );
    } catch (err) {
      await reply(`❌ Error al obtener info del grupo: ${err.message}`);
    }
  },
};
