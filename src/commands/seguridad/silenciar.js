const { loadStore, saveStore } = require("../../database/db");

module.exports = {
  name: ["silenciar", "mute", "mutear"],
  description: "🔇 Silenciar/activar a un usuario del bot",
  category: "🛡️ SEGURIDAD",
  groupOnly: true,
  execute: async ({ jid, msg, reply }) => {
    const mencionados = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mencionados?.length) return reply("❌ Menciona al usuario.\nEjemplo: .silenciar @usuario");
    const target = mencionados[0];
    const store = loadStore();
    if (!store.silenciados) store.silenciados = {};
    if (!store.silenciados[jid]) store.silenciados[jid] = [];
    const lista = store.silenciados[jid];
    const yaSilenciado = lista.includes(target);
    if (yaSilenciado) {
      store.silenciados[jid] = lista.filter(j => j !== target);
      saveStore(store);
      return reply(`🔔 @${target.split("@")[0]} fue des-silenciado. Ya puede usar comandos.`, { mentions: [target] });
    }
    lista.push(target);
    saveStore(store);
    await reply(`🔇 @${target.split("@")[0]} silenciado. No podrá usar comandos en este grupo.`, { mentions: [target] });
  },
};
