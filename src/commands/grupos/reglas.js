const { loadStore, saveStore } = require("../../database/db");

module.exports = {
  name: ["reglas", "rules", "normas"],
  description: "📜 Ver o establecer las reglas del grupo",
  category: "👥 ADMINISTRACIÓN DE GRUPOS",
  groupOnly: true,
  execute: async ({ jid, reply, args, isOwner }) => {
    const store = loadStore();
    if (!store.reglas) store.reglas = {};

    if (!args.length) {
      const r = store.reglas[jid];
      if (!r) return reply("📜 Este grupo no tiene reglas configuradas.\nUsa .reglas set <reglas> para establecerlas.");
      return reply(`📜 *REGLAS DEL GRUPO*\n\n${r}`);
    }

    if (!isOwner) return reply("❌ Solo el owner puede modificar las reglas.");
    if (args[0] === "set") {
      const texto = args.slice(1).join(" ");
      if (!texto) return reply("❌ Escribe las reglas.\nEjemplo: .reglas set 1. No spam\n2. Respeto mutuo");
      store.reglas[jid] = texto;
      saveStore(store);
      return reply(`✅ Reglas actualizadas:\n\n${texto}`);
    }
    if (args[0] === "clear" || args[0] === "borrar") {
      delete store.reglas[jid];
      saveStore(store);
      return reply("✅ Reglas eliminadas.");
    }
    await reply("❌ Opciones: .reglas | .reglas set <texto> | .reglas borrar");
  },
};
