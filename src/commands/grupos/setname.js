module.exports = {
  name: "setname",
  description: "✏️ Cambiar el nombre del grupo",
  category: "👥 ADMINISTRACIÓN DE GRUPOS",
  groupOnly: true,
  execute: async ({ sock, jid, args, reply }) => {
    if (!args.length) return reply("❌ Uso: .setname <nuevo nombre>");
    const nombre = args.join(" ");
    try {
      await sock.groupUpdateSubject(jid, nombre);
      await reply(`✅ Nombre del grupo cambiado a: *${nombre}*`);
    } catch {
      await reply("❌ No tengo permisos de admin para cambiar el nombre.");
    }
  },
};
