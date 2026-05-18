module.exports = {
  name: "sticker",
  description: "Convertir imagen a sticker",
  category: "FUN",
  execute: async ({ sock, jid, msg, reply }) => {
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const hasImage =
      msg.message?.imageMessage ||
      quoted?.imageMessage ||
      msg.message?.videoMessage ||
      quoted?.videoMessage;
    if (!hasImage) return reply("❌ Responde una imagen/video con .sticker");
    try {
      const stream = await sock.downloadMediaMessage(msg);
      await sock.sendMessage(jid, {
        sticker: stream,
      });
    } catch (err) {
      await reply(`❌ Error: ${err.message}`);
    }
  },
};
