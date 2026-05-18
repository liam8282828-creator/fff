# 🤖 NOVA BOT — Professional WhatsApp Bot

Bot profesional de WhatsApp con sistema de economía, comandos por módulos y API REST para control externo.

## ⚡ Instalación rápida

```bash
cd artifacts/nova-bot
npm install
cp .env.example .env
# Edita .env con tus valores
node src/index.js
```

## ⚙️ Variables de entorno (.env)

| Variable | Descripción |
|---|---|
| `PORT` | Puerto del servidor (default: 3000) |
| `API_KEY` | Clave secreta para la API REST |
| `BASE_URL` | URL pública del servidor (Render/VPS) |
| `OWNER_NUMBER` | Tu número de WhatsApp (sin +) |
| `PREFIX` | Prefijo de comandos (default: `.`) |
| `BOT_NAME` | Nombre del bot |

## 🌐 API REST

Todas las rutas requieren header: `x-api-key: TU_API_KEY`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/status` | Estado del bot |
| GET | `/api/qr` | QR para escanear |
| POST | `/api/send-message` | Enviar mensaje |
| POST | `/api/send-image` | Enviar imagen |
| POST | `/api/execute-command` | Ejecutar comando |
| POST | `/api/restart` | Reiniciar bot |
| GET | `/api/users` | Lista de usuarios |
| GET | `/api/commands` | Lista de comandos |

### Ejemplo — Enviar mensaje

```bash
curl -X POST https://tu-url.onrender.com/api/send-message \
  -H "x-api-key: nova-secret-key" \
  -H "Content-Type: application/json" \
  -d '{"jid":"5491112345678@s.whatsapp.net","message":"Hola!"}'
```

## 📂 Comandos disponibles

| Categoría | Comandos |
|---|---|
| INFO | `.menu` `.help` `.ping` `.botinfo` `.runtime` `.owner` `.profile` |
| ECONOMÍA | `.reg` `.trabajar` `.daily` `.balance` `.transfer` `.tienda` `.inventario` `.rob` `.topcoins` |
| GRUPOS | `.kick` `.add` `.promote` `.demote` `.tagall` `.group` |
| SEGURIDAD | `.antilink` `.antispam` `.warn` |
| MÚSICA | `.play` `.lyrics` |
| FUN | `.sticker` `.toimg` `.meme` `.joke` `.fact` |
| IA | `.ai` `.chat` `.gpt` `.ask` `.translate` |
| OWNER | `.restart` `.shutdown` `.ban` `.unban` `.broadcast` `.setprefix` |

## 🚀 Deploy en Render

1. Sube el proyecto a GitHub
2. Crea un nuevo **Web Service** en Render
3. Build command: `npm install`
4. Start command: `node src/index.js`
5. Agrega las variables de entorno desde `.env.example`

## 🏗️ Agregar comandos

Crea un archivo en `src/commands/<categoria>/mi-comando.js`:

```js
module.exports = {
  name: "micomando",           // alias: ["micomando", "mc"]
  description: "Descripción",
  category: "CATEGORIA",
  ownerOnly: false,            // solo owner si es true
  execute: async ({ reply, args, user, sock, jid, senderJid }) => {
    await reply("¡Hola desde mi comando!");
  },
};
```

El loader lo detecta automáticamente al reiniciar el bot.
