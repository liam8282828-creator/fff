module.exports = {
  name: ["qr", "qrcode"],
  description: "📱 Generar un código QR de texto o URL",
  category: "🔧 UTILIDADES",
  execute: async ({ reply, args, sock, jid, msg }) => {
    if (!args.length) return reply("❌ Uso: .qr <texto o URL>");
    const texto = encodeURIComponent(args.join(" "));
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${texto}`;
    try {
      await sock.sendMessage(jid, {
        image: { url },
        caption: `📱 *Código QR generado*\n\nContenido: ${decodeURIComponent(texto)}`,
      }, { quoted: msg });
    } catch {
      await reply(`📱 QR generado:\n${url}\n\nContenido: ${decodeURIComponent(texto)}`);
    }
  },
};
