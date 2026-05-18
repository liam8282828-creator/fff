const config = require("../../config/config");
const { uptime } = require("../../utils/utils");

const MENU_IMAGE = "https://i.postimg.cc/KjdFr1ws/0027AEFE-0BD6-44FF-931B-D38165630F5F.png";

const MENU_TEXT = (p, runtime) =>
`╔══════════════════════════╗
║  🤖  *NOVA BOT*  ║
╚══════════════════════════╝
⏱ *Runtime:* ${runtime}
📌 *Prefix:* ${p}
━━━━━━━━━━━━━━━━━━━━━

📊 *REGISTRO & INFORMACIÓN*
${p}reg — 📝 Registrarse en el bot (Obligatorio)
${p}profile — 👤 Ver tu perfil y datos guardados
${p}menu — 📜 Muestra el menú principal del bot
${p}botinfo — ℹ️ Información técnica del bot
${p}owner — 👑 Muestra información del creador
${p}ping — ⚡ Verifica la velocidad de respuesta
${p}runtime — ⏳ Tiempo de actividad en línea

👑 *OWNER & CREADOR (EXCLUSIVOS)*
${p}nuke — ☢️ Expulsión masiva de todos los miembros
${p}block — 🚷 Bloquear un usuario del bot
${p}addcoins — 🪙 Dar coins a un usuario específico
${p}ban — 🔨 Banear/desbanear a un usuario del bot
${p}broadcast — 🗣️ Enviar un comunicado a todos los chats
${p}leave — 🚪 Hacer que el bot abandone el grupo
${p}restart — 🔄 Reiniciar los sistemas del bot
${p}setprefix — ⚙️ Cambiar el prefix de los comandos
${p}privado — 🔐 Activar/desactivar comandos en privado
${p}shutdown — 🛑 Apagar el bot por completo

🛡️ *SEGURIDAD*
${p}antilink — 🔗 Activar/desactivar detector de enlaces
${p}antispam — 🚫 Activar/desactivar bloqueo de spam
${p}antitoxic — 🤬 Detectar y expulsar usuarios tóxicos
${p}antiarabe — 🌍 Expulsar números extranjeros automáticamente
${p}antiflood — 🌊 Protección anti-flood de mensajes
${p}antibots — 🤖 Expulsar bots automáticamente
${p}antinsfw — 🔞 Bloquear contenido adulto
${p}antisticker — 🖼️ Bloquear stickers en el grupo
${p}warn — ⚠️ Advertir a un usuario (3 warns = kick)
${p}unwarn — ✅ Remover advertencias a un usuario
${p}silenciar — 🔇 Silenciar/des-silenciar a un usuario

👥 *ADMINISTRACIÓN DE GRUPOS*
${p}tagall — 📢 Mencionar a todos los miembros
${p}kick — 🚷 Expulsar a un usuario del grupo
${p}add — ➕ Agregar un número al grupo
${p}promote — 📈 Promover a administrador
${p}demote — 📉 Quitar el rango de administrador
${p}group — 🔒 Abrir o cerrar el grupo
${p}bienvenida — 🚪 Configurar bienvenida automática
${p}despedida — 👋 Configurar despedida automática
${p}link — 🔗 Obtener el enlace de invitación
${p}setname — ✏️ Cambiar el nombre del grupo
${p}encuesta — 📊 Crear una encuesta en el grupo
${p}reglas — 📜 Ver o establecer reglas del grupo
${p}infogrupo — ℹ️ Información completa del grupo
${p}adminonly — 🔐 Comandos solo para admins

🧠 *INTELIGENCIA ARTIFICIAL*
${p}ai — 💬 Chat directo con la inteligencia artificial
${p}gemini — 🚀 Consultas avanzadas con Gemini
${p}dalle — 🎨 Generar imágenes con DALL·E
${p}remini — 🪄 Mejorar la calidad de una foto
${p}translate — 🌐 Traducir texto a otro idioma
${p}avatar — 🖼️ Ver foto de perfil de un usuario
${p}resumir — 📝 Resumir un texto con IA
${p}corregir — ✏️ Corregir gramática y ortografía
${p}emojify — 😄 Convertir texto en emojis
${p}rima — 🎭 Crear una rima o poema
${p}faker — 🎭 Generar datos de perfil ficticios
${p}tts — 🔊 Texto a voz (audio de WhatsApp)

💰 *ECONOMÍA*
${p}balance — 💳 Ver tus coins y nivel actual
${p}banco — 🏦 Ver tu saldo bancario
${p}depositar — 🏦 Depositar coins al banco
${p}retirar — 🏦 Retirar coins del banco
${p}trabajar — 💼 Trabajar para ganar coins
${p}daily — 🎁 Recompensa diaria de coins
${p}minar — ⛏️ Minar recursos para ganar coins
${p}pescar — 🎣 Pescar para obtener coins
${p}cazar — 🏹 Cazar animales para ganar coins
${p}transfer — 💸 Transferir coins a otro usuario
${p}tienda — 🏪 Ver y comprar items de la tienda
${p}inventario — 🎒 Ver tu inventario de items
${p}vender — 💸 Vender items de tu inventario
${p}casino — 🎰 Apostar coins en el casino
${p}slots — 🎰 Jugar en la máquina tragaperras
${p}ruleta — 🎡 Jugar a la ruleta
${p}rob — 🦹 Robar coins a otro usuario
${p}topcoins — 🏆 Ranking de usuarios con más coins

🎮 *FUN*
${p}sticker — 🖼️ Convertir imagen a sticker
${p}toimg — 📸 Convertir sticker a imagen
${p}meme — 😂 Meme o chiste aleatorio
${p}8ball — 🎱 La bola mágica responde tu pregunta
${p}dado — 🎲 Tirar un dado
${p}flipcoin — 🪙 Cara o cruz
${p}chiste — 😂 Chiste aleatorio
${p}verdadoretor — 🎯 Verdad o reto aleatorio
${p}rps — 🪨 Piedra papel tijera vs el bot
${p}sorteo — 🎟️ Sorteo entre los mencionados
${p}complimento — 💌 Cumplido aleatorio
${p}horoscopo — 🔮 Horóscopo del día
${p}trivia — 🧠 Pregunta de trivia aleatoria

🔧 *UTILIDADES*
${p}calc — 🧮 Calcular expresiones matemáticas
${p}hora — 🕐 Ver la hora por zona horaria
${p}clima — 🌤️ Ver el clima de cualquier ciudad
${p}moneda — 💱 Convertir entre divisas
${p}definir — 📖 Definición de una palabra
${p}wikipedia — 📚 Buscar en Wikipedia
${p}qr — 📱 Generar código QR
${p}acortar — 🔗 Acortar una URL larga
${p}invertir — 🔄 Invertir un texto
${p}ascii — 🔤 Arte ASCII con texto
${p}contar — 🔢 Contar palabras y caracteres

🎵 *MÚSICA*
${p}play — ▶️ Descargar audio de YouTube
${p}lyrics — 🎤 Letra de una canción

━━━━━━━━━━━━━━━━━━━━━
💡 Usa *${p}help <cmd>* para más info
📊 Total: *100 comandos activos*`;

module.exports = {
  name: ["menu", "help"],
  description: "📜 Muestra el menú principal del bot",
  category: "📊 REGISTRO & INFORMACIÓN",
  execute: async ({ sock, jid, msg }) => {
    const text = MENU_TEXT(config.PREFIX, uptime());
    try {
      await sock.sendMessage(jid, {
        image: { url: MENU_IMAGE },
        caption: text,
      }, { quoted: msg });
    } catch {
      await sock.sendMessage(jid, { text }, { quoted: msg });
    }
  },
};
