module.exports = {
  name: ["sorteo", "rifa", "random"],
  description: "🎟️ Sorteo entre los mencionados",
  category: "🎮 FUN",
  execute: async ({ reply, msg, args }) => {
    const mencionados = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    if (mencionados.length < 2) return reply("❌ Menciona al menos 2 personas.\nEjemplo: .sorteo @user1 @user2 @user3");
    const ganador = mencionados[Math.floor(Math.random() * mencionados.length)];
    const num = ganador.split("@")[0];
    await reply(
      `🎟️ *SORTEO NOVA*\n\n` +
      `👥 Participantes: ${mencionados.length}\n\n` +
      `🏆 *¡Ganador/a: @${num}!* 🎉`,
      { mentions: [ganador] }
    );
  },
};
