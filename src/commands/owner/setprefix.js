const { loadStore, saveStore } = require("../../database/db");

module.exports = {
  name: "setprefix",
  description: "Cambiar el prefix del bot",
  category: "OWNER",
  ownerOnly: true,
  execute: async ({ reply, args }) => {
    if (!args[0]) return reply("❌ Uso: .setprefix <nuevo prefix>");
    const store = loadStore();
    store.prefix = args[0];
    saveStore(store);
    await reply(`✅ Prefix cambiado a: *${args[0]}*\nReinicia el bot para aplicar.`);
  },
};
