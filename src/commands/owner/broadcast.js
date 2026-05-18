const db = require("../../database/db");
const { sleep } = require("../../utils/utils");

module.exports = {
  name: ["broadcast", "bc"],
  description: "Enviar mensaje a todos los usuarios",
  category: "OWNER",
  ownerOnly: true,
  execute: async ({ reply, sock, args }) => {
    if (!args.length) return reply("❌ Uso: .broadcast <mensaje>");
    const message = args.join(" ");
    const users = db.getAllUsers();
    const jids = Object.keys(users).filter((j) => users[j].registered);
    await reply(`📡 Enviando a ${jids.length} usuarios...`);
    let sent = 0;
    for (const jid of jids) {
      try {
        await sock.sendMessage(jid, {
          text: `📢 *NOVA BOT — Broadcast*\n\n${message}`,
        });
        sent++;
        await sleep(1000);
      } catch {}
    }
    await reply(`✅ Broadcast enviado a ${sent}/${jids.length} usuarios.`);
  },
};
