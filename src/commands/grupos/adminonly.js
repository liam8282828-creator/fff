const { loadStore, saveStore } = require("../../database/db");

module.exports = {
  name: ["adminonly", "soloadmins", "adminsolo"],
  description: "🔐 Comandos disponibles solo para admins del grupo",
  category: "👥 ADMINISTRACIÓN DE GRUPOS",
  groupOnly: true,
  execute: async ({ jid, args, reply, sock, msg }) => {
    const senderJid = msg.key.participant || msg.key.remoteJid;
    const meta = await sock.groupMetadata(jid).catch(() => null);
    const esAdmin = meta?.participants?.find(p => p.id === senderJid)?.admin;
    if (!esAdmin) return reply("❌ Solo los admins pueden usar este comando.");

    const store = loadStore();
    if (!store.adminonly) store.adminonly = {};
    const action = args[0]?.toLowerCase();
    if (!action || !["on","off","activar","desactivar"].includes(action))
      return reply(`🔐 Admin Only: ${store.adminonly[jid] ? "✅ Activo" : "❌ Inactivo"}\n\nUso: .adminonly on | off`);
    const activar = ["on","activar"].includes(action);
    store.adminonly[jid] = activar;
    saveStore(store);
    await reply(activar ? "✅ Modo admin-only activado.\nSolo admins podrán usar comandos en este grupo." : "❌ Modo admin-only desactivado.");
  },
};
