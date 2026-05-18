require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  API_KEY: process.env.API_KEY || "nova-secret-key",
  BASE_URL: process.env.BASE_URL || "http://localhost:3000",
  NOVA_API_URL: process.env.NOVA_API_URL || "",
  BOT_KEY: process.env.BOT_KEY || "",
  BOT_URL: process.env.BOT_URL || "",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "",
  PREFIX: process.env.PREFIX || ".",
  BOT_NAME: process.env.BOT_NAME || "NOVA BOT",
  SESSION_DIR: "./session",
  DB_PATH: "./database/users.json",
  STORE_PATH: "./database/store.json",
  RECONNECT_INTERVAL: 10000,
  COOLDOWN_TRABAJAR: 30 * 60 * 1000,
  COOLDOWN_DAILY: 24 * 60 * 60 * 1000,
  COOLDOWN_ROB: 60 * 60 * 1000,
  INITIAL_COINS: 500,
  SHOP_ITEMS: [
    { id: "vip",    name: "VIP Pass",         price: 2000, description: "Acceso VIP al bot" },
    { id: "boost",  name: "Coin Boost",        price: 500,  description: "x2 coins por 1 hora" },
    { id: "shield", name: "Escudo Anti-Rob",   price: 300,  description: "Protege tus coins 24h" },
  ],
};
