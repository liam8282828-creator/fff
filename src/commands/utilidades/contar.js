module.exports = {
  name: ["contar", "contador", "wordcount"],
  description: "🔢 Contar palabras, letras y caracteres",
  category: "🔧 UTILIDADES",
  execute: async ({ reply, args, msg }) => {
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const textoQ = quoted?.conversation || quoted?.extendedTextMessage?.text;
    const texto = textoQ || args.join(" ");
    if (!texto) return reply("❌ Responde a un mensaje o escribe texto.\nEjemplo: .contar Hola mundo");
    const palabras = texto.trim().split(/\s+/).filter(Boolean).length;
    const letras = texto.replace(/\s/g, "").length;
    const caracteres = texto.length;
    const lineas = texto.split("\n").length;
    await reply(
      `🔢 *Contador de texto*\n\n` +
      `📝 Palabras: *${palabras}*\n` +
      `🔤 Letras: *${letras}*\n` +
      `📊 Caracteres (con espacios): *${caracteres}*\n` +
      `📋 Líneas: *${lineas}*`
    );
  },
};
