const config = require("../../config/config");

module.exports = {
  name: "owner",
  description: "Muestra info del owner",
  category: "INFO",
  execute: async ({ reply }) => {
    await reply(
      `👑 *Owner de ${config.BOT_NAME}*\n\n`
      + `📞 Número: wa.me/${config.OWNER_NUMBER}\n`
      + `🤖 Bot: ${config.BOT_NAME} v1.0.0`
    );
  },
};
