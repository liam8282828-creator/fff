module.exports = {
  name: ["calc", "calculadora", "math"],
  description: "🧮 Calcular expresiones matemáticas",
  category: "🔧 UTILIDADES",
  execute: async ({ reply, args }) => {
    if (!args.length) return reply("❌ Uso: .calc <expresión>\nEjemplo: .calc 2 + 2 * 5");
    const expr = args.join(" ").replace(/[^0-9+\-*/.() %]/g, "");
    try {
      const resultado = Function(`"use strict"; return (${expr})`)();
      if (!isFinite(resultado)) return reply("❌ Resultado inválido (división entre cero?)");
      await reply(`🧮 *Calculadora*\n\n📝 ${expr}\n\n= *${resultado}*`);
    } catch {
      await reply("❌ Expresión inválida.\nEjemplo: .calc (10 + 5) * 3");
    }
  },
};
