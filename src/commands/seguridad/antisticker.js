const { loadStore, saveStore } = require("../../database/db");

module.exports = {
  name: ["antisticker", "nosticker"],
  description: "🖼️ Bloquear stickers en el grupo",
  category: "🛡️ SEGURIDAD",
  groupOnly: true,
  execute: async ({ jid, args, reply }) => {
    const store = loadStore();
    if (!store.antisticker) store.antisticker = {};
    const action = args[0]?.toLowerCase();
    if (!action || !["on","off","activar","desactivar"].includes(action)) {
      return reply(`🖼️ Anti-Sticker: ${store.antisticker[jid] ? "✅ Activo" : "❌ Inactivo"}\n\nUso: .antisticker on | off`);
    }
    const activar = ["on","activar"].includes(action);
    store.antisticker[jid] = activar;
    saveStore(store);
    await reply(activar
      ? "✅ Anti-sticker activado.\nSe eliminarán los stickers enviados en el grupo."
      : "❌ Anti-sticker desactivado.");
  },
};
