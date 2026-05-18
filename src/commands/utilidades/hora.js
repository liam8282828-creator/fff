const ZONAS = {
  argentina: "America/Argentina/Buenos_Aires",
  mexico: "America/Mexico_City",
  colombia: "America/Bogota",
  venezuela: "America/Caracas",
  chile: "America/Santiago",
  peru: "America/Lima",
  españa: "Europe/Madrid",
  eeuu: "America/New_York",
  usa: "America/New_York",
  brasil: "America/Sao_Paulo",
  utc: "UTC",
};

module.exports = {
  name: ["hora", "time", "reloj"],
  description: "🕐 Ver la hora actual por zona horaria",
  category: "🔧 UTILIDADES",
  execute: async ({ reply, args }) => {
    const pais = args[0]?.toLowerCase() || "utc";
    const tz = ZONAS[pais];
    if (!tz) {
      const lista = Object.keys(ZONAS).join(", ");
      return reply(`❌ País no reconocido.\nDisponibles: ${lista}`);
    }
    const ahora = new Date().toLocaleString("es-ES", {
      timeZone: tz, weekday: "long", day: "2-digit",
      month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit",
    });
    await reply(`🕐 *Hora en ${pais.charAt(0).toUpperCase() + pais.slice(1)}*\n\n📅 ${ahora}`);
  },
};
