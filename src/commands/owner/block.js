const { loadStore, saveStore } = require("../../database/db");

module.exports = {
  name: "block",
  description: "🚷 Bloquear/desbloquear un usuario del bot",
  category: "👑 OWNER & CREADOR (EXCLUSIVOS)",
  ownerOnly: true,
  execute: async ({ reply, msg, args }) => {
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    const targetJid = mentioned?.[0] || (args[0] && `${args[0].replace(/[^0-9]/g, "")}@s.whatsapp.net`);
    if (!targetJid) return reply("❌ Menciona al usuario.\nEjemplo: .block @usuario");

    const store = loadStore();
    if (!store.blocked) store.blocked = [];

    const yaBlockeado = store.blocked.includes(targetJid);
    if (yaBlockeado) {
      store.blocked = store.blocked.filter((j) => j !== targetJid);
      saveStore(store);
      return reply(`✅ @${targetJid.split("@")[0]} desbloqueado del bot.`, { mentions: [targetJid] });
    }

    store.blocked.push(targetJid);
    saveStore(store);
    await reply(`🚷 @${targetJid.split("@")[0]} bloqueado del bot. No podrá usar ningún comando.`, { mentions: [targetJid] });
  },
};
