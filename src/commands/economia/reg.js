const db = require("../../database/db");
const config = require("../../config/config");
const { formatCoins } = require("../../utils/utils");

module.exports = {
  name: "reg",
  description: "Registrarse en el bot",
  category: "ECONOMÍA",
  execute: async ({ reply, senderJid, args }) => {
    if (db.isRegistered(senderJid)) {
      return reply("✅ Ya estás registrado. Usa *.perfil* para ver tus datos.");
    }
    if (!args[0] || !args[0].includes(".")) {
      return reply(
        `❌ Uso incorrecto.\n\n*Formato:* ${config.PREFIX}reg nombre.edad\n*Ejemplo:* ${config.PREFIX}reg Nova.18`
      );
    }
    const [nombre, edadStr] = args[0].split(".");
    const edad = parseInt(edadStr);
    if (!nombre || isNaN(edad) || edad < 1 || edad > 120) {
      return reply("❌ Nombre o edad inválidos.\n*Ejemplo:* .reg Nova.18");
    }
    const user = db.createUser(senderJid, { nombre, edad });
    await reply(
      `╔══════════════════════╗\n`
      + `║   🎉 *¡BIENVENIDO!*    ║\n`
      + `╚══════════════════════╝\n\n`
      + `👤 *Nombre:* ${user.nombre}\n`
      + `🎂 *Edad:* ${user.edad}\n`
      + `💰 *Coins iniciales:* ${formatCoins(config.INITIAL_COINS)}\n`
      + `⭐ *Nivel:* 1\n\n`
      + `✅ ¡Registro completado! Ya puedes usar todos los comandos.\n`
      + `Usa *${config.PREFIX}menu* para ver lo disponible.`
    );
  },
};
