module.exports = {
  name: "kick",
  description: "Expulsar a un usuario del grupo",
  category: "GRUPOS",
  execute: async ({ sock, jid, msg, reply }) => {
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mentioned || !mentioned.length) return reply("❌ Menciona al usuario a expulsar.");
    if (!jid.endsWith("@g.us")) return reply("❌ Solo funciona en grupos.");
    try {
      await sock.groupParticipantsUpdate(jid, mentioned, "remove");
      await reply(`✅ Expulsado: @${mentioned[0].split("@")[0]}`, { mentions: mentioned });
    } catch {
      await reply("❌ No tengo permisos de admin.");
    }
  },
};
