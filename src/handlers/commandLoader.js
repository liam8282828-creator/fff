const fs = require("fs");
const path = require("path");

const commands = new Map();

function loadCommands(dir) {
  const fullDir = path.resolve(dir);
  if (!fs.existsSync(fullDir)) return;

  const entries = fs.readdirSync(fullDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(fullDir, entry.name);
    if (entry.isDirectory()) {
      loadCommands(fullPath);
    } else if (entry.name.endsWith(".js")) {
      try {
        const cmd = require(fullPath);
        if (cmd.name && cmd.execute) {
          const names = Array.isArray(cmd.name) ? cmd.name : [cmd.name];
          names.forEach((n) => commands.set(n.toLowerCase(), cmd));
          console.log(`[LOADER] Comando cargado: ${names.join(", ")}`);
        }
      } catch (err) {
        console.error(`[LOADER] Error cargando ${fullPath}:`, err.message);
      }
    }
  }
}

function getCommand(name) {
  return commands.get(name.toLowerCase()) || null;
}

function getAllCommands() {
  const result = {};
  commands.forEach((cmd, key) => {
    const cat = cmd.category || "General";
    if (!result[cat]) result[cat] = [];
    if (!result[cat].find((c) => c.name === cmd.name)) {
      result[cat].push({ name: cmd.name, description: cmd.description || "" });
    }
  });
  return result;
}

module.exports = { loadCommands, getCommand, getAllCommands };
