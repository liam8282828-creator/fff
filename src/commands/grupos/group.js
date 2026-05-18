module.exports = {
  name: "group",
  description: "Abrir o cerrar el grupo",
  category: "GRUPOS",
  execute: async ({ sock, jid, args, reply }) => {
    if (!jid.endsWith("@g.us")) return reply("❌ Solo en grupos.");
    const action = args[0];
    if (!["open", "close", "abrir", "cerrar"].includes(action)) {
      return reply("❌ Uso: .group open | .group close");
    }
    const setting = action === "open" || action === "abrir" ? "not_announcement" : "announcement";
    try {
      await sock.groupSettingUpdate(jid, setting);
      await reply(setting === "announcement" ? "🔒 Grupo cerrado." : "🔓 Grupo abierto.");
    } catch {
      await reply("❌ Sin permisos de admin.");
    }
  },
};
