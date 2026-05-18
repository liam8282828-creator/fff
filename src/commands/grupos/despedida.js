const { loadStore, saveStore } = require("../../database/db");

module.exports = {
  name: ["despedida", "goodbye", "bye"],
  description: "👋 Configurar mensaje de despedida automático",
  category: "👥 ADMINISTRACIÓN DE GRUPOS",
  groupOnly: true,
  execute: async ({ jid, args, reply }) => {
    const store = loadStore();
    if (!store.despedida) store.despedida = {};

    if (!args.length) {
      const cfg = store.despedida[jid];
      return reply(
        cfg
          ? `👋 Despedida: ${cfg.activo ? "✅ Activa" : "❌ Inactiva"}\nMensaje: ${cfg.mensaje}`
          : "👋 Despedida no configurada.\n.despedida on/off/set <mensaje>"
      );
    }

    if (args[0] === "off") {
      if (store.despedida[jid]) store.despedida[jid].activo = false;
      saveStore(store);
      return reply("❌ Mensaje de despedida desactivado.");
    }
    if (args[0] === "on") {
      store.despedida[jid] = { activo: true, mensaje: store.despedida[jid]?.mensaje || "Hasta pronto @user, te echaremos de menos 👋" };
      saveStore(store);
      return reply("✅ Despedida activada.");
    }
    if (args[0] === "set") {
      const mensaje = args.slice(1).join(" ");
      if (!mensaje) return reply("❌ Escribe el mensaje. Usa @user como variable.");
      store.despedida[jid] = { activo: true, mensaje };
      saveStore(store);
      return reply(`✅ Despedida configurada:\n\n${mensaje}`);
    }
    await reply("Uso: .despedida on | off | set <mensaje>");
  },
};
