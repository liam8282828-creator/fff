const { loadStore, saveStore } = require("../../database/db");

module.exports = {
  name: ["bienvenida", "welcome"],
  description: "🚪 Configurar mensaje de bienvenida automático",
  category: "👥 ADMINISTRACIÓN DE GRUPOS",
  groupOnly: true,
  execute: async ({ jid, args, reply }) => {
    const store = loadStore();
    if (!store.bienvenida) store.bienvenida = {};

    if (!args.length) {
      const actual = store.bienvenida[jid];
      if (!actual) return reply(
        "🚪 *Bienvenida no configurada.*\n\n" +
        "Uso:\n" +
        "• `.bienvenida on` — Activar con mensaje por defecto\n" +
        "• `.bienvenida off` — Desactivar\n" +
        "• `.bienvenida set Hola @user!` — Mensaje personalizado\n\n" +
        "Variables: `@user` = nombre, `@grupo` = grupo"
      );
      return reply(`🚪 Bienvenida: ${actual.activo ? "✅ Activa" : "❌ Inactiva"}\nMensaje: ${actual.mensaje}`);
    }

    if (args[0] === "off" || args[0] === "desactivar") {
      if (store.bienvenida[jid]) store.bienvenida[jid].activo = false;
      saveStore(store);
      return reply("❌ Bienvenida desactivada.");
    }

    if (args[0] === "on" || args[0] === "activar") {
      store.bienvenida[jid] = {
        activo: true,
        mensaje: store.bienvenida[jid]?.mensaje || "¡Bienvenido/a @user al grupo @grupo! 🎉",
      };
      saveStore(store);
      return reply("✅ Bienvenida activada con mensaje por defecto.");
    }

    if (args[0] === "set") {
      const mensaje = args.slice(1).join(" ");
      if (!mensaje) return reply("❌ Escribe el mensaje.\nEjemplo: .bienvenida set ¡Hola @user!");
      store.bienvenida[jid] = { activo: true, mensaje };
      saveStore(store);
      return reply(`✅ Mensaje de bienvenida configurado:\n\n${mensaje}`);
    }

    await reply("❌ Opción inválida. Usa: `.bienvenida on/off/set <mensaje>`");
  },
};
