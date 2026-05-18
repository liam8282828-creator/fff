const OPCIONES = { piedra: "🪨", papel: "📄", tijera: "✂️" };
const GANA = { piedra: "tijera", papel: "piedra", tijera: "papel" };

module.exports = {
  name: ["rps", "piedra", "pppt"],
  description: "🪨 Jugar Piedra Papel Tijera contra el bot",
  category: "🎮 FUN",
  execute: async ({ reply, args }) => {
    const eleccion = args[0]?.toLowerCase();
    const validas = Object.keys(OPCIONES);
    if (!validas.includes(eleccion))
      return reply("❌ Elige: .rps piedra | papel | tijera");

    const bot = validas[Math.floor(Math.random() * 3)];
    let resultado;
    if (eleccion === bot) resultado = "🟡 *Empate*";
    else if (GANA[eleccion] === bot) resultado = "✅ *¡Ganaste!*";
    else resultado = "❌ *Perdiste*";

    await reply(
      `🪨📄✂️ *Piedra Papel Tijera*\n\n` +
      `Tú: ${OPCIONES[eleccion]} ${eleccion}\n` +
      `Bot: ${OPCIONES[bot]} ${bot}\n\n` +
      `${resultado}`
    );
  },
};
