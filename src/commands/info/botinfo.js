const config = require("../../config/config");
const { uptime } = require("../../utils/utils");
const db = require("../../database/db");

module.exports = {
  name: ["botinfo", "info"],
  description: "Información del bot",
  category: "INFO",
  execute: async ({ reply }) => {
    const users = Object.keys(db.getAllUsers()).length;
    const mem = process.memoryUsage();
    const text = `╔══════════════════════╗\n`
      + `║   🤖 *NOVA BOT INFO*   ║\n`
      + `╚══════════════════════╝\n\n`
      + `📛 *Nombre:* ${config.BOT_NAME}\n`
      + `⚡ *Runtime:* ${uptime()}\n`
      + `👥 *Usuarios:* ${users}\n`
      + `🧠 *RAM:* ${(mem.heapUsed / 1024 / 1024).toFixed(1)} MB\n`
      + `🟢 *Estado:* En línea\n`
      + `📌 *Prefix:* ${config.PREFIX}\n`
      + `🔧 *Plataforma:* ${process.platform}\n`
      + `🟡 *Node.js:* ${process.version}`;
    await reply(text);
  },
};
