const { loadStore, saveStore } = require("../../database/db");

module.exports = {
  name: "antiarabe",
  description: "🌍 Expulsar automáticamente números extranjeros",
  category: "🛡️ SEGURIDAD",
  groupOnly: true,
  execute: async ({ jid, args, reply }) => {
    const store = loadStore();
    if (!store.antiarabe) store.antiarabe = {};
    const action = ["on","activar"].includes(args[0]?.toLowerCase());
    store.antiarabe[jid] = action;
    saveStore(store);
    await reply(action
      ? "✅ Anti-árabe/extranjero activado.\nSe expulsarán automáticamente números con prefijos no locales."
      : "❌ Anti-extranjero desactivado."
    );
  },
};
