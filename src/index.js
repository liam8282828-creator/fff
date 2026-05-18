require("dotenv").config();
const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  DisconnectReason,
} = require("@whiskeysockets/baileys");
const pino = require("pino");
const path = require("path");
const fs = require("fs");

const config = require("./config/config");
const { startServer } = require("./server");
const { handleMessage } = require("./handlers/messageHandler");
const { handleConnectionUpdate, handleGroupParticipants } = require("./events/connectionHandler");
const { loadCommands } = require("./handlers/commandLoader");
const { checkApiStatus } = require("./apiClient");

global.botConnected = false;
global.currentQR = null;
global.novaSocket = null;
global.botConnectedAt = null;

const SESSION_DIR = path.resolve(config.SESSION_DIR);
if (!fs.existsSync(SESSION_DIR)) fs.mkdirSync(SESSION_DIR, { recursive: true });

const COMMANDS_DIR = path.resolve("./src/commands");

async function startBot() {
  console.log(`\n╔══════════════════════════════╗`);
  console.log(`║       NOVA BOT v1.0.0        ║`);
  console.log(`║   Professional WhatsApp Bot  ║`);
  console.log(`╚══════════════════════════════╝\n`);

  loadCommands(COMMANDS_DIR);

  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`[BOT] Baileys v${version} ${isLatest ? "(última)" : "(actualización disponible)"}`);

  const { state, saveCreds } = await useMultiFileAuthState(SESSION_DIR);

  const logger = pino({ level: "silent" });

  const sock = makeWASocket({
    version,
    logger,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
    printQRInTerminal: false,
    browser: ["NOVA BOT", "Chrome", "1.0.0"],
    markOnlineOnConnect: true,
    syncFullHistory: false,
    generateHighQualityLinkPreview: true,
  });

  global.novaSocket = sock;

  sock.ev.on("connection.update", (update) =>
    handleConnectionUpdate(update, sock, startBot)
  );

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify") return;
    for (const msg of messages) {
      await handleMessage(sock, msg);
    }
  });

  sock.ev.on("group-participants.update", async (update) => {
    await handleGroupParticipants(sock, update);
  });

  startApiKeepAlive();
}

function startApiKeepAlive() {
  setInterval(async () => {
    const status = await checkApiStatus();
    if (!status) {
      console.log("[KEEP-ALIVE] ⚠️  API no responde, reconectando...");
    }
  }, config.RECONNECT_INTERVAL);
}

async function main() {
  await startServer();
  await startBot();
}

process.on("uncaughtException", (err) => {
  console.error("[ERROR] Excepción no controlada:", err.message);
});

process.on("unhandledRejection", (reason) => {
  console.error("[ERROR] Promise rechazado:", reason);
});

main();
