const { loadStore, saveStore } = require("../../database/db");

module.exports = {
  name: ["warn", "advertir"],
  description: "Advertir a un usuario (3 warns = kick)",
  category: "SEGURIDAD",
  execute: async ({ jid, msg, reply, sock, args }) => {
    if (!jid.endsWith("@g.us")) return reply("❌ Solo en grupos.");
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mentioned?.length) return reply("❌ Menciona al usuario.");
    const target = mentioned[0];
    const store = loadStore();
    if (!store.warns) store.warns = {};
    if (!store.warns[jid]) store.warns[jid] = {};
    store.warns[jid][target] = (store.warns[jid][target] || 0) + 1;
    const count = store.warns[jid][target];
    saveStore(store);
    if (count >= 3) {
      store.warns[jid][target] = 0;
      saveStore(store);
      await sock.groupParticipantsUpdate(jid, [target], "remove").catch(() => {});
      return reply(`🚫 @${target.split("@")[0]} fue expulsado por 3 advertencias.`, { mentions: [target] });
    }
    await reply(`⚠️ *Advertencia ${count}/3* a @${target.split("@")[0]}\n${args.slice(1).join(" ") || ""}`, { mentions: [target] });
  },
};
