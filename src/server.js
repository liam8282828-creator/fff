const express = require("express");
const config = require("./config/config");
const botRoutes = require("./routes/botRoutes");
const { checkApiStatus, registerBot, sendViaNova } = require("./apiClient");
const { getAllCommands } = require("./handlers/commandLoader");
const { handleMessage } = require("./handlers/messageHandler");

const app = express();
app.use(express.json());

// ── Raíz ─────────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ name: config.BOT_NAME, status: "running", version: "1.0.0" });
});

// ── GET /info — NOVA API consulta los comandos del bot ───────────────────────
app.get("/info", (req, res) => {
  const categories = getAllCommands();
  const commands = [];

  for (const [, cmds] of Object.entries(categories)) {
    for (const cmd of cmds) {
      const name = Array.isArray(cmd.name) ? cmd.name[0] : cmd.name;
      commands.push({
        name,
        description: cmd.description || "",
        usage: `${config.PREFIX}${name}`,
      });
    }
  }

  res.json({
    name: config.BOT_NAME,
    version: "1.0.0",
    prefix: config.PREFIX,
    description: "Bot de WhatsApp profesional con economía y comandos modulares",
    commands,
  });
});

// ── POST /message — NOVA API reenvía mensajes de WhatsApp ────────────────────
app.post("/message", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Campo 'message' requerido" });
  }

  // Responde inmediatamente para no bloquear a NOVA API
  res.json({ ok: true });

  const text = message.text || "";
  const from = message.from;

  if (!text.startsWith(config.PREFIX) || !from) return;

  const args = text.slice(config.PREFIX.length).trim().split(/\s+/);
  const commandName = args.shift().toLowerCase();

  console.log(`[MESSAGE] Recibido de NOVA API: ${commandName} de ${from}`);

  if (!global.novaSocket) {
    console.warn("[MESSAGE] WhatsApp no conectado. Respondiendo via NOVA API.");
    await sendViaNova(from, "⚠️ Bot conectado pero WhatsApp no listo aún. Intenta en un momento.").catch(() => {});
    return;
  }

  try {
    // Construye un mensaje falso compatible con handleMessage
    const fakeMsg = {
      key: {
        remoteJid: from,
        fromMe: false,
        id: message.id || "NOVAMSG",
        participant: message.isGroup ? from : undefined,
      },
      message: { conversation: text },
      messageTimestamp: message.timestamp || Math.floor(Date.now() / 1000),
    };

    await handleMessage(global.novaSocket, fakeMsg);
  } catch (err) {
    console.error("[MESSAGE] Error procesando:", err.message);
    await sendViaNova(from, `❌ Error procesando el comando: ${err.message}`).catch(() => {});
  }
});

// ── Rutas de la API REST interna (requieren x-api-key) ───────────────────────
app.use("/api", botRoutes);

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// ── Iniciar servidor y registrar en NOVA API ─────────────────────────────────
async function startServer() {
  return new Promise((resolve) => {
    app.listen(config.PORT, async () => {
      console.log(`[SERVER] ✅ Corriendo en puerto ${config.PORT}`);
      console.log(`[SERVER] GET  ${config.BOT_URL || "http://localhost:" + config.PORT}/info`);
      console.log(`[SERVER] POST ${config.BOT_URL || "http://localhost:" + config.PORT}/message`);

      // Verificar que la propia API responde
      const status = await checkApiStatus();
      if (status) {
        console.log(`[SERVER] 🔄 Auto-check OK: ${JSON.stringify(status)}`);
      }

      // Registrar en NOVA API externa
      await registerBot();

      resolve();
    });
  });
}

module.exports = { app, startServer };
