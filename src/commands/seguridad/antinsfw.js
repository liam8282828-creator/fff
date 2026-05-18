const { loadStore, saveStore } = require("../../database/db");

module.exports = {
  name: ["antinsfw", "antinsfw", "nsfw"],
  description: "🔞 Activar/desactivar filtro de contenido NSFW",
  category: "🛡️ SEGURIDAD",
  groupOnly: true,
  execute: async ({ jid, args, reply }) => {
    const store = loadStore();
    if (!store.antinsfw) store.antinsfw = {};
    const action = args[0]?.toLowerCase();
    if (!action || !["on","off","activar","desactivar"].includes(action)) {
      return reply(`🔞 Anti-NSFW: ${store.antinsfw[jid] ? "✅ Activo" : "❌ Inactivo"}\n\nUso: .antinsfw on | off`);
    }
    const activar = ["on","activar"].includes(action);
    store.antinsfw[jid] = activar;
    saveStore(store);
    await reply(activar
      ? "✅ Anti-NSFW activado.\nEl bot eliminará imágenes/videos con contenido adulto."
      : "❌ Anti-NSFW desactivado.");
  },
};
