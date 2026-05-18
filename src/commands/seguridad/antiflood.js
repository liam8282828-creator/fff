const { loadStore, saveStore } = require("../../database/db");

module.exports = {
  name: ["antiflood", "antispam2", "flood"],
  description: "🌊 Activar/desactivar protección anti-flood",
  category: "🛡️ SEGURIDAD",
  groupOnly: true,
  execute: async ({ jid, args, reply }) => {
    const store = loadStore();
    if (!store.antiflood) store.antiflood = {};
    const action = args[0]?.toLowerCase();
    if (!action || !["on","off","activar","desactivar"].includes(action)) {
      const cfg = store.antiflood[jid];
      return reply(`🌊 Anti-Flood: ${cfg?.activo ? "✅ Activo" : "❌ Inactivo"}\n${cfg ? `Límite: ${cfg.limite} mensajes en ${cfg.tiempo}s` : ""}\n\nUso: .antiflood on [límite] [segundos]`);
    }
    const activar = ["on","activar"].includes(action);
    const limite = parseInt(args[1]) || 5;
    const tiempo = parseInt(args[2]) || 10;
    store.antiflood[jid] = { activo: activar, limite, tiempo };
    saveStore(store);
    await reply(activar
      ? `✅ Anti-flood activado.\nLímite: *${limite} mensajes* en *${tiempo}s*\nSe advertirá y expulsará al que haga flood.`
      : "❌ Anti-flood desactivado.");
  },
};
