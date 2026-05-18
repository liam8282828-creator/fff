module.exports = {
  name: ["tts", "voz", "hablar", "speak"],
  description: "🔊 Texto a voz (audio de WhatsApp)",
  category: "🧠 INTELIGENCIA ARTIFICIAL",
  execute: async ({ reply, args, sock, jid, msg }) => {
    if (!args.length) return reply("❌ Uso: .tts <texto>\nEjemplo: .tts Hola mundo");
    const texto = args.join(" ").slice(0, 200);
    const lang = "es";
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${lang}&q=${encodeURIComponent(texto)}`;
    try {
      await sock.sendMessage(jid, {
        audio: { url },
        mimetype: "audio/mp4",
        ptt: true,
      }, { quoted: msg });
    } catch {
      await reply(`❌ No se pudo generar el audio. Intenta con un texto más corto.`);
    }
  },
};
