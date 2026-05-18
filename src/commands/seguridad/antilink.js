const db = require("../../database/db");
const { loadStore, saveStore } = require("../../database/db");

module.exports = {
  name: "antilink",
  description: "Activar/desactivar anti-links en el grupo",
  category: "SEGURIDAD",
  execute: async ({ jid, args, reply, sock }) => {
    if (!jid.endsWith("@g.us")) return reply("❌ Solo en grupos.");
    const store = loadStore();
    if (!store.antilink) store.antilink = {};
    const action = args[0] === "on" || args[0] === "activar";
    store.antilink[jid] = action;
    saveStore(store);
    await reply(action ? "✅ Anti-link activado." : "❌ Anti-link desactivado.");
  },
};
