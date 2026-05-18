const https = require("https");

module.exports = {
  name: ["meme", "joke", "fact"],
  description: "Meme, chiste o dato curioso",
  category: "FUN",
  execute: async ({ reply, args }) => {
    const cmd = args[-1] || "meme";
    const jokes = [
      "¿Por qué los programadores prefieren el modo oscuro?\nPorque la luz atrae a los bugs. 🐛",
      "¿Cuántos programadores se necesitan para cambiar una bombilla?\nNinguno, es un problema de hardware.",
      "Un SQL injector entra a un bar. Elimina todas las mesas, escapa y se va.",
      "¿Cómo se llama el bot de WhatsApp más famoso?\n... NOVA BOT, obvio. 🤖",
      "Error 404: Chiste no encontrado. Intenta de nuevo.",
    ];
    const facts = [
      "🧠 El cerebro humano usa más energía que cualquier otro órgano.",
      "🐙 Los pulpos tienen tres corazones.",
      "🌍 La Tierra tiene más de 4.5 mil millones de años.",
      "🤖 El primer bot de chat fue ELIZA, creado en 1966.",
      "💡 Thomas Edison patentó más de 1,000 inventos.",
    ];
    const list = cmd === "fact" ? facts : jokes;
    await reply(list[Math.floor(Math.random() * list.length)]);
  },
};
