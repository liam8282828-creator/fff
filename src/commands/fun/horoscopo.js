const SIGNOS = {
  aries: "♈", tauro: "♉", geminis: "♊", cancer: "♋",
  leo: "♌", virgo: "♍", libra: "♎", escorpio: "♏",
  sagitario: "♐", capricornio: "♑", acuario: "♒", piscis: "♓",
};

const PREDICCIONES = [
  "Los astros favorecen tus decisiones hoy. ¡Atrévete!",
  "Una sorpresa agradable llega a tu vida muy pronto.",
  "Hoy es un buen día para conectar con personas importantes.",
  "El universo te pide calma y paciencia, será recompensado.",
  "Las oportunidades que buscas están más cerca de lo que crees.",
  "Es momento de cerrar ciclos y abrirte a lo nuevo.",
  "Tu intuición está en su punto más alto. Confía en ella.",
  "Un encuentro inesperado cambiará tu perspectiva hoy.",
  "Hoy tu energía creativa está al máximo. ¡Úsala!",
  "Las finanzas mejorarán si tomas decisiones con cabeza fría.",
];

module.exports = {
  name: ["horoscopo", "horóscopo", "signo"],
  description: "🔮 Horóscopo del día para tu signo",
  category: "🎮 FUN",
  execute: async ({ reply, args }) => {
    if (!args.length) {
      const lista = Object.keys(SIGNOS).join(", ");
      return reply(`🔮 Indica tu signo zodiacal.\nEjemplo: .horoscopo leo\n\nSignos: ${lista}`);
    }
    const signo = args[0].toLowerCase();
    const emoji = SIGNOS[signo];
    if (!emoji) return reply(`❌ Signo inválido. Usa: ${Object.keys(SIGNOS).join(", ")}`);
    const pred = PREDICCIONES[Math.floor(Math.random() * PREDICCIONES.length)];
    const suerte = Math.floor(Math.random() * 10) + 1;
    await reply(
      `${emoji} *Horóscopo de ${signo.charAt(0).toUpperCase() + signo.slice(1)}*\n\n` +
      `📅 Predicción de hoy:\n_${pred}_\n\n` +
      `🍀 Número de suerte: *${suerte}*\n` +
      `💫 Energía del día: ${"⭐".repeat(suerte > 7 ? 5 : suerte > 4 ? 3 : 2)}`
    );
  },
};
