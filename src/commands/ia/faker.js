const NOMBRES = ["Alejandro","María","Carlos","Sofía","Juan","Valentina","Diego","Camila","Luis","Ana"];
const APELLIDOS = ["García","López","Martínez","González","Hernández","Rodríguez","Torres","Ramírez"];
const PAISES = ["Argentina","México","Colombia","Venezuela","Chile","Perú","España","Uruguay"];
const PROFESIONES = ["Desarrollador","Diseñador","Médico","Abogado","Ingeniero","Chef","Maestro","Fotógrafo"];
const r = (arr) => arr[Math.floor(Math.random() * arr.length)];

module.exports = {
  name: ["faker", "datos", "persona"],
  description: "🎭 Generar datos de perfil falsos",
  category: "🧠 INTELIGENCIA ARTIFICIAL",
  execute: async ({ reply }) => {
    const nombre = `${r(NOMBRES)} ${r(APELLIDOS)}`;
    const edad = Math.floor(Math.random() * 40) + 18;
    const pais = r(PAISES);
    const prof = r(PROFESIONES);
    const email = `${nombre.toLowerCase().replace(" ", ".")}${Math.floor(Math.random() * 999)}@gmail.com`;
    const tel = `+${Math.floor(Math.random() * 90) + 10}${Math.floor(Math.random() * 9000000000) + 1000000000}`;
    await reply(
      `🎭 *Perfil generado*\n\n` +
      `👤 Nombre: ${nombre}\n` +
      `🎂 Edad: ${edad} años\n` +
      `🌍 País: ${pais}\n` +
      `💼 Profesión: ${prof}\n` +
      `📧 Email: ${email}\n` +
      `📱 Teléfono: ${tel}\n\n` +
      `_⚠️ Datos 100% ficticios_`
    );
  },
};
