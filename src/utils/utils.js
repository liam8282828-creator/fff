const config = require("../config/config");

function formatTime(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (d > 0) return `${d}d ${h % 24}h ${m % 60}m`;
  if (h > 0) return `${h}h ${m % 60}m ${s % 60}s`;
  if (m > 0) return `${m}m ${s % 60}s`;
  return `${s}s`;
}

function formatCoins(n) {
  return n.toLocaleString("es-ES");
}

function cleanJid(jid) {
  return jid.split("@")[0].split(":")[0];
}

function isOwner(jid) {
  const owner = config.OWNER_NUMBER.replace(/[^0-9]/g, "");
  if (!owner) return false;
  const sender = cleanJid(jid).replace(/[^0-9]/g, "");
  // Comparación directa o sin código de país
  return sender === owner || sender.endsWith(owner) || owner.endsWith(sender);
}

function isGroup(jid) {
  return jid.endsWith("@g.us");
}

function levelFromXp(xp) {
  return Math.floor(0.1 * Math.sqrt(xp)) + 1;
}

function xpForNextLevel(nivel) {
  return Math.pow((nivel) / 0.1, 2);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function uptime() {
  const s = process.uptime();
  return formatTime(s * 1000);
}

module.exports = {
  formatTime,
  formatCoins,
  cleanJid,
  isOwner,
  isGroup,
  levelFromXp,
  xpForNextLevel,
  randomInt,
  sleep,
  uptime,
};
