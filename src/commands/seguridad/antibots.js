const { loadStore, saveStore } = require("../../database/db");

module.exports = {
  name: ["antibots", "antibot", "nobot"],
  description: "🤖 Expulsar bots automáticamente del grupo",
  category: "🛡️ SEGURIDAD",
  groupOnly: true,
  execute: async ({ jid, args, reply }) => {
    const store = loadStore();
    if (!store.antibots) store.antibots = {};
    const action = args[0]?.toLowerCase();
    if (!action || !["on","off","activar","desactivar"].includes(action)) {
      return reply(`🤖 Anti-Bots: ${store.antibots[jid] ? "✅ Activo" : "❌ Inactivo"}\n\nUso: .antibots on | off`);
    }
    const activar = ["on","activar"].includes(action);
    store.antibots[jid] = activar;
    saveStore(store);
    await reply(activar
      ? "✅ Anti-bots activado.\nSe expulsarán automáticamente los números con formato de bot."
      : "❌ Anti-bots desactivado.");
  },
};
