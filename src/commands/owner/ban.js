const db = require("../../database/db");

module.exports = {
  name: ["ban", "unban"],
  description: "Banear/desbanear un usuario",
  category: "OWNER",
  ownerOnly: true,
  execute: async ({ reply, msg, args }) => {
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    const targetJid = (mentioned && mentioned[0]) || (args[1] && `${args[1].replace(/[^0-9]/g, "")}@s.whatsapp.net`);
    if (!targetJid) return reply("❌ Menciona al usuario.");
    const isBanning = args[0] === "ban" || !args[0]?.includes("un");
    db.updateUser(targetJid, { banned: isBanning });
    await reply(isBanning
      ? `🚫 Usuario baneado: @${targetJid.split("@")[0]}`
      : `✅ Usuario desbaneado: @${targetJid.split("@")[0]}`,
      { mentions: [targetJid] }
    );
  },
};
