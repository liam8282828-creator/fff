const { uptime } = require("../../utils/utils");

module.exports = {
  name: ["runtime", "uptime"],
  description: "Tiempo de actividad del bot",
  category: "INFO",
  execute: async ({ reply }) => {
    await reply(`⏱ *Runtime:* ${uptime()}`);
  },
};
