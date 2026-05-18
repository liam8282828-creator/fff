module.exports = {
  name: "leave",
  description: "🚪 Hacer que el bot abandone el grupo",
  category: "👑 OWNER & CREADOR (EXCLUSIVOS)",
  ownerOnly: true,
  groupOnly: true,
  execute: async ({ sock, jid, reply }) => {
    await reply("🚪 Saliendo del grupo... ¡Hasta luego!");
    await sock.groupLeave(jid);
  },
};
