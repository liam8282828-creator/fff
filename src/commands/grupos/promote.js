module.exports = {
  name: "promote",
  description: "Promover a admin a un usuario",
  category: "GRUPOS",
  execute: async ({ sock, jid, msg, reply }) => {
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mentioned?.length) return reply("❌ Menciona al usuario a promover.");
    if (!jid.endsWith("@g.us")) return reply("❌ Solo en grupos.");
    try {
      await sock.groupParticipantsUpdate(jid, mentioned, "promote");
      await reply(`👑 Promovido a admin: @${mentioned[0].split("@")[0]}`, { mentions: mentioned });
    } catch {
      await reply("❌ Sin permisos de admin.");
    }
  },
};
