const axios = require("axios");

module.exports = {
  name: ["clima", "weather", "tiempo"],
  description: "🌤️ Ver el clima de cualquier ciudad",
  category: "🔧 UTILIDADES",
  execute: async ({ reply, args }) => {
    if (!args.length) return reply("❌ Uso: .clima <ciudad>\nEjemplo: .clima Buenos Aires");
    const ciudad = args.join(" ");

    if (!process.env.WEATHER_API_KEY) {
      return reply(
        `🌤️ *Clima - ${ciudad}*\n\n` +
        `⚙️ Para activar el clima real, agrega en tu .env:\n` +
        `WEATHER_API_KEY=tu-clave\n\n` +
        `Obtén clave gratis en: openweathermap.org/api\n\n` +
        `_Demo:_ 🌡️ 22°C | 💧 65% | 💨 15 km/h`
      );
    }

    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        { params: { q: ciudad, appid: process.env.WEATHER_API_KEY, units: "metric", lang: "es" }, timeout: 8000 }
      );
      const { temp, humidity, feels_like } = data.main;
      const desc = data.weather[0].description;
      const viento = data.wind.speed;
      await reply(
        `🌤️ *Clima en ${data.name}, ${data.sys.country}*\n\n` +
        `🌡️ Temperatura: *${Math.round(temp)}°C* (sensación ${Math.round(feels_like)}°C)\n` +
        `📝 Condición: ${desc}\n` +
        `💧 Humedad: ${humidity}%\n` +
        `💨 Viento: ${viento} m/s`
      );
    } catch {
      await reply(`❌ Ciudad no encontrada: "${ciudad}". Verifica el nombre.`);
    }
  },
};
