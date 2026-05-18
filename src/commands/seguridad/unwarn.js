const { loadStore, saveStore } = require("../../database/db");

module.exports = {
  name: ["unwarn", "quitarwarn"],
  description: "✅ Remover advertencias a un usuario",
  category: "🛡️ SEGURIDAD",
  groupOnly: true,
  execute: async ({ jid, msg, reply }) => {
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mentioned?.length) return reply("❌ Menciona al usuario.\nEjemplo: .unwarn @usuario");
    const target = mentioned[0];
    const store = loadStore();
    if (!store.warns?.[jid]?.[target]) {
      return reply(`ℹ️ @${target.split("@")[0]} no tiene advertencias.`, { mentions: [target] });
    }
    store.warns[jid][target] = 0;
    saveStore(store);
    await reply(`✅ Advertencias de @${target.split("@")[0]} eliminadas.`, { mentions: [target] });
  },
};
