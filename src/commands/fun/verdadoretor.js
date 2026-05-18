const VERDADES = [
  "¿Cuál fue tu mayor vergüenza pública?",
  "¿Alguna vez mentiste a tus padres? ¿Sobre qué?",
  "¿Cuál es tu mayor miedo que nadie sabe?",
  "¿A quién en este grupo le tienes más confianza?",
  "¿Alguna vez copiaste en un examen?",
  "¿Cuál es la persona que más te ha hecho daño?",
  "¿Tienes algún crush secreto aquí?",
  "¿Qué harías si tuvieras un millón de dólares?",
];

const RETOS = [
  "Escribe un mensaje de amor al último contacto que usaste.",
  "Haz 20 sentadillas ahora mismo y dilo cuando termines.",
  "Canta 10 segundos de tu canción favorita.",
  "Manda una foto haciendo una pose ridícula.",
  "Llama a alguien y dile que lo extrañas.",
  "Escribe algo bonito sobre cada miembro del grupo.",
  "No puedes usar emojis por 10 minutos.",
  "Cambia tu foto de perfil por un meme durante 1 hora.",
];

module.exports = {
  name: ["verdadoretor", "tor", "truth"],
  description: "🎯 Verdad o reto aleatorio",
  category: "🎮 FUN",
  execute: async ({ reply, args }) => {
    const tipo = args[0]?.toLowerCase();
    if (tipo === "verdad" || tipo === "v") {
      return reply(`✅ *VERDAD*\n\n${VERDADES[Math.floor(Math.random() * VERDADES.length)]}`);
    }
    if (tipo === "reto" || tipo === "r") {
      return reply(`🔥 *RETO*\n\n${RETOS[Math.floor(Math.random() * RETOS.length)]}`);
    }
    const esVerdad = Math.random() < 0.5;
    const lista = esVerdad ? VERDADES : RETOS;
    const elegido = lista[Math.floor(Math.random() * lista.length)];
    await reply(`${esVerdad ? "✅ *VERDAD*" : "🔥 *RETO*"}\n\n${elegido}\n\n_Usa .tor verdad o .tor reto para elegir_`);
  },
};
