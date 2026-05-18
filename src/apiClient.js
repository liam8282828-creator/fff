const axios = require("axios");
const config = require("./config/config");

// ── Cliente hacia NOVA API externa ───────────────────────────────────────────
const api = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    "x-api-key": config.API_KEY,
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("[API CLIENT] Error:", err.message);
    return Promise.reject(err);
  }
);

// Verifica que la propia API REST del bot responde
async function checkApiStatus() {
  try {
    const res = await api.get("/api/status");
    return res.data;
  } catch {
    return null;
  }
}

// ── Registrar este bot en NOVA API ───────────────────────────────────────────
async function registerBot() {
  const { NOVA_API_URL, API_KEY, BOT_KEY, BOT_URL, BOT_NAME } = config;

  if (!NOVA_API_URL || !BOT_KEY || !BOT_URL) {
    console.log("[REGISTER] ⚠️  NOVA_API_URL / BOT_KEY / BOT_URL no configurados. Saltando registro.");
    return;
  }

  try {
    const { data } = await axios.post(
      `${NOVA_API_URL}/api/register-bot`,
      { url: BOT_URL, key: BOT_KEY },
      {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      }
    );
    console.log(`[REGISTER] ✅ Bot registrado en NOVA API: ${data?.bot?.name || BOT_NAME}`);
    return data;
  } catch (err) {
    const msg = err.response?.data?.error || err.message;
    console.error(`[REGISTER] ❌ Error registrando bot: ${msg}`);
  }
}

// ── Enviar mensaje VÍA NOVA API externa ──────────────────────────────────────
async function sendViaNova(to, message) {
  const { NOVA_API_URL, API_KEY } = config;
  if (!NOVA_API_URL) return;
  return axios.post(
    `${NOVA_API_URL}/api/send-message`,
    { to, message },
    { headers: { "x-api-key": API_KEY }, timeout: 10000 }
  );
}

module.exports = { api, checkApiStatus, registerBot, sendViaNova };
