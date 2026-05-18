const { sleep } = require("../../utils/utils");

module.exports = {
  name: "nuke",
  description: "☢️ Expulsión masiva de todos los miembros del grupo",
  category: "👑 OWNER & CREADOR (EXCLUSIVOS)",
  ownerOnly: true,
  groupOnly: true,
  execute: async ({ sock, jid, senderJid, reply }) => {
    try {
      const meta = await sock.groupMetadata(jid);
      const members = meta.participants
        .filter((p) => p.id !== senderJid && !p.admin)
        .map((p) => p.id);

      if (!members.length) return reply("⚠️ No hay miembros no-admin para expulsar.");

      await reply(`☢️ *NUKE iniciado.*\nExpulsando ${members.length} miembros...`);

      for (const jidM of members) {
        try {
          await sock.groupParticipantsUpdate(jid, [jidM], "remove");
          await sleep(800);
        } catch {}
      }

      await sock.sendMessage(jid, { text: `✅ NUKE completado. ${members.length} miembros expulsados.` });
    } catch (err) {
      await reply(`❌ Error: ${err.message}`);
    }
  },
};
