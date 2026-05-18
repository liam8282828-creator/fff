const { loadStore, saveStore } = require("../../database/db");

module.exports = {
  name: ["privado", "dmmode"],
  description: "🔐 Activar/desactivar comandos en privado",
  category: "👑 OWNER & CREADOR (EXCLUSIVOS)",
  ownerOnly: true,
  execute: async ({ reply, args }) => {
    const store = loadStore();
    const accion = args[0]?.toLowerCase();

    if (!accion || !["on", "off", "activar", "desactivar"].includes(accion)) {
      const estado = store.privado ? "✅ *Activado*" : "❌ *Desactivado*";
      return reply(
        `🔐 *Modo Privado*\n\nEstado actual: ${estado}\n\nUso:\n• \`.privado on\` — Activar\n• \`.privado off\` — Desactivar`
      );
    }

    const activar = accion === "on" || accion === "activar";
    store.privado = activar;
    saveStore(store);

    await reply(
      activar
        ? "✅ *Modo privado activado.*\nLos usuarios ya pueden usar comandos en chat privado."
        : "❌ *Modo privado desactivado.*\nLos comandos solo funcionarán en grupos."
    );
  },
};
