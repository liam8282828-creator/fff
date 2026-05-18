module.exports = {
  name: "link",
  description: "🔗 Obtener el enlace de invitación del grupo",
  category: "👥 ADMINISTRACIÓN DE GRUPOS",
  groupOnly: true,
  execute: async ({ sock, jid, reply }) => {
    try {
      const code = await sock.groupInviteCode(jid);
      await reply(`🔗 *Enlace de invitación:*\nhttps://chat.whatsapp.com/${code}`);
    } catch {
      await reply("❌ No tengo permisos de admin para obtener el enlace.");
    }
  },
};
