const COMPLIMENTOS = [
  "Eres una persona increíblemente especial ✨",
  "Tu presencia ilumina cualquier lugar 🌟",
  "Tienes una sonrisa que vale más que mil palabras 😊",
  "Eres más inteligente de lo que crees 🧠",
  "El mundo es mejor porque tú estás en él 🌍",
  "Tu energía positiva es contagiosa 💫",
  "Tienes un corazón de oro 💛",
  "Eres fuerte aunque a veces no lo sientas 💪",
  "Cada día que pasa demuestras lo genial que eres 🚀",
  "Tu creatividad no tiene límites 🎨",
];

module.exports = {
  name: ["complimento", "halagar", "elogiar"],
  description: "💌 Enviar un cumplido aleatorio",
  category: "🎮 FUN",
  execute: async ({ reply, msg }) => {
    const mencionados = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    const c = COMPLIMENTOS[Math.floor(Math.random() * COMPLIMENTOS.length)];
    if (mencionados?.length) {
      const num = mencionados[0].split("@")[0];
      return reply(`💌 Para @${num}:\n\n_${c}_`, { mentions: mencionados });
    }
    await reply(`💌 *Cumplido del día*\n\n_${c}_`);
  },
};
