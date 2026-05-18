const { loadStore, saveStore } = require("../../database/db");

module.exports = {
  name: "antispam",
  description: "Activar/desactivar anti-spam en el grupo",
  category: "SEGURIDAD",
  execute: async ({ jid, args, reply }) => {
    if (!jid.endsWith("@g.us")) return reply("❌ Solo en grupos.");
    const store = loadStore();
    if (!store.antispam) store.antispam = {};
    const action = args[0] === "on" || args[0] === "activar";
    store.antispam[jid] = action;
    saveStore(store);
    await reply(action ? "✅ Anti-spam activado." : "❌ Anti-spam desactivado.");
  },
};
