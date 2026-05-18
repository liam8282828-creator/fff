module.exports = {
  name: ["avatar", "foto", "pfp", "pp"],
  description: "🖼️ Ver la foto de perfil de un usuario",
  category: "🧠 INTELIGENCIA ARTIFICIAL",
  execute: async ({ sock, jid, msg, reply, args }) => {
    const mencionados = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    const targetJid = mencionados?.[0] || jid;
    try {
      const url = await sock.profilePictureUrl(targetJid, "image");
      const num = targetJid.split("@")[0];
      await sock.sendMessage(jid, {
        image: { url },
        caption: `🖼️ Foto de perfil de @${num}`,
        mentions: [targetJid],
      }, { quoted: msg });
    } catch {
      await reply("❌ No se pudo obtener la foto de perfil.\nEl usuario puede tenerla privada.");
    }
  },
};
