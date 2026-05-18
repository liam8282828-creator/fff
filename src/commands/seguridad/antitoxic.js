const { loadStore, saveStore } = require("../../database/db");

const PALABRAS_TOXICAS = [
  "idiota","imbecil","estupido","maldito","hdp","puta","puto","verga","mierda",
  "culero","cabron","pendejo","mamaguevo","coño","marica","joto","bastardo",
];

module.exports = {
  name: "antitoxic",
  description: "🤬 Activar/desactivar expulsión por lenguaje tóxico",
  category: "🛡️ SEGURIDAD",
  groupOnly: true,
  execute: async ({ jid, args, reply }) => {
    const store = loadStore();
    if (!store.antitoxic) store.antitoxic = {};
    const action = ["on","activar"].includes(args[0]?.toLowerCase());
    store.antitoxic[jid] = action;
    saveStore(store);
    await reply(action
      ? "✅ Anti-tóxico activado. Los usuarios con lenguaje ofensivo serán advertidos/expulsados."
      : "❌ Anti-tóxico desactivado."
    );
  },
};

// Exportar palabras para usar en el event handler
module.exports.PALABRAS_TOXICAS = PALABRAS_TOXICAS;
