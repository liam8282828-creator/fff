const MAPA = {
  feliz:"😊",triste:"😢",amor:"❤️",fuego:"🔥",sol:"☀️",luna:"🌙",
  casa:"🏠",coche:"🚗",comida:"🍕",musica:"🎵",deporte:"⚽",dinero:"💰",
  trabajo:"💼",estudio:"📚",telefono:"📱",computadora:"💻",juego:"🎮",
  fiesta:"🎉",viaje:"✈️",playa:"🏖️",noche:"🌃",mañana:"🌅",
};

module.exports = {
  name: ["emojify", "emoji", "emotify"],
  description: "😄 Convertir texto en emojis",
  category: "🧠 INTELIGENCIA ARTIFICIAL",
  execute: async ({ reply, args }) => {
    if (!args.length) return reply("❌ Uso: .emojify <texto>");
    const texto = args.join(" ").toLowerCase();
    let resultado = texto;
    for (const [palabra, emoji] of Object.entries(MAPA)) {
      resultado = resultado.replace(new RegExp(`\\b${palabra}\\b`, "gi"), emoji);
    }
    const extra = ["✨","🌟","💫","⚡","🎯","🚀"][Math.floor(Math.random() * 6)];
    await reply(`😄 *Emojificado*\n\n${resultado} ${extra}`);
  },
};
