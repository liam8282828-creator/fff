const CHISTES = [
  "¿Por qué los pájaros vuelan hacia el sur en invierno?\n\n_Porque caminar tardaría demasiado_ 😂",
  "¿Qué le dijo el cero al ocho?\n\n_¡Bonito cinturón!_ 🤣",
  "¿Qué hace una abeja en el gimnasio?\n\n_¡Zum-ba!_ 💪🐝",
  "¿Por qué el libro de matemáticas estaba triste?\n\n_Tenía demasiados problemas_ 📚😅",
  "¿Cómo se llama el campeón de buceo japonés?\n\n_Tokofondo_ 🏊",
  "¿Qué le dice un jardinero a otro?\n\n_¡Que te molo, tío!_ 🌱",
  "¿Cómo se despiden los químicos?\n\n_¡Ácido un placer!_ 🧪",
  "¿Cuál es el colmo de un electricista?\n\n_Que su mujer le deje sin luz_ 💡",
  "¿Qué hace un dinosaurio con un vaso de leche?\n\n_¡Leche-saurio!_ 🦕🥛",
  "¿Por qué Darth Vader no puede comer?\n\n_Porque siempre tiene el lado oscuro del tenedor_ 🍴",
];

module.exports = {
  name: ["chiste", "joke", "humor"],
  description: "😂 Chiste aleatorio para animarte",
  category: "🎮 FUN",
  execute: async ({ reply }) => {
    const c = CHISTES[Math.floor(Math.random() * CHISTES.length)];
    await reply(`😂 *Chiste del día*\n\n${c}`);
  },
};
