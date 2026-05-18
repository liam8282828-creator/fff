const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const db = require("../database/db");
const { getAllCommands } = require("../handlers/commandLoader");
const { uptime } = require("../utils/utils");

const router = Router();

router.use(authMiddleware);

router.get("/status", (req, res) => {
  res.json({
    status: "ok",
    bot: global.botConnected ? "connected" : "disconnected",
    connectedAt: global.botConnectedAt || null,
    uptime: uptime(),
    users: Object.keys(db.getAllUsers()).length,
  });
});

router.get("/qr", (req, res) => {
  if (global.currentQR) {
    res.json({ qr: global.currentQR });
  } else if (global.botConnected) {
    res.json({ status: "already_connected" });
  } else {
    res.status(202).json({ status: "generating" });
  }
});

router.post("/send-message", async (req, res) => {
  const { jid, message } = req.body;
  if (!jid || !message) {
    return res.status(400).json({ error: "jid y message son requeridos" });
  }
  if (!global.novaSocket) {
    return res.status(503).json({ error: "Bot no conectado" });
  }
  try {
    await global.novaSocket.sendMessage(jid, { text: message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/send-image", async (req, res) => {
  const { jid, url, caption } = req.body;
  if (!jid || !url) {
    return res.status(400).json({ error: "jid y url son requeridos" });
  }
  if (!global.novaSocket) {
    return res.status(503).json({ error: "Bot no conectado" });
  }
  try {
    await global.novaSocket.sendMessage(jid, {
      image: { url },
      caption: caption || "",
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/execute-command", async (req, res) => {
  const { jid, command } = req.body;
  if (!jid || !command) {
    return res.status(400).json({ error: "jid y command son requeridos" });
  }
  if (!global.novaSocket) {
    return res.status(503).json({ error: "Bot no conectado" });
  }
  try {
    const fakeMsg = {
      key: { remoteJid: jid, fromMe: false },
      message: { conversation: command },
    };
    const { handleMessage } = require("../handlers/messageHandler");
    await handleMessage(global.novaSocket, fakeMsg);
    res.json({ success: true, command });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/restart", (req, res) => {
  res.json({ success: true, message: "Reiniciando bot..." });
  setTimeout(() => process.exit(0), 500);
});

router.get("/users", (req, res) => {
  const users = db.getAllUsers();
  res.json({ count: Object.keys(users).length, users });
});

router.get("/commands", (req, res) => {
  res.json(getAllCommands());
});

module.exports = router;
