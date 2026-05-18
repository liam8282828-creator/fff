const PREGUNTAS = [
  { p: "¿Cuál es el planeta más grande del sistema solar?", r: "Júpiter" },
  { p: "¿En qué año llegó el hombre a la Luna?", r: "1969" },
  { p: "¿Cuántos continentes tiene la Tierra?", r: "7" },
  { p: "¿Cuál es el elemento químico con símbolo Au?", r: "Oro" },
  { p: "¿Qué animal es el más rápido del mundo?", r: "El guepardo" },
  { p: "¿Cuántos lados tiene un hexágono?", r: "6" },
  { p: "¿En qué país nació Albert Einstein?", r: "Alemania" },
  { p: "¿Cuál es el océano más grande?", r: "Pacífico" },
  { p: "¿Cuántos jugadores tiene un equipo de fútbol?", r: "11" },
  { p: "¿Cuál es el idioma más hablado en el mundo?", r: "Mandarín" },
  { p: "¿Cuántos huesos tiene el cuerpo humano adulto?", r: "206" },
  { p: "¿Quién pintó la Mona Lisa?", r: "Leonardo da Vinci" },
];

module.exports = {
  name: ["trivia", "quiz", "pregunta"],
  description: "🧠 Pregunta de trivia aleatoria",
  category: "🎮 FUN",
  execute: async ({ sock, jid, reply }) => {
    const q = PREGUNTAS[Math.floor(Math.random() * PREGUNTAS.length)];
    await reply(`🧠 *TRIVIA*\n\n❓ ${q.p}\n\n_Tienes 30 segundos para responder_`);
    setTimeout(() => {
      sock.sendMessage(jid, { text: `⏱️ Tiempo agotado.\n✅ La respuesta era: *${q.r}*` });
    }, 30000);
  },
};
