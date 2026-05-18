module.exports = {
  name: "toimg",
  description: "Convertir sticker a imagen",
  category: "FUN",
  execute: async ({ sock, jid, msg, reply }) => {
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const stickerMsg = msg.message?.stickerMessage || quoted?.stickerMessage;
    if (!stickerMsg) return reply("❌ Responde un sticker con .toimg");
    try {
      const stream = await sock.downloadMediaMessage(msg);
      await sock.sendMessage(jid, { image: stream, caption: "🖼️ Imagen extraída" });
    } catch (err) {
      await reply(`❌ Error: ${err.message}`);
    }
  },
};
