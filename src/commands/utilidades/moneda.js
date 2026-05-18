const axios = require("axios");

const PARES = { USD:"$", EUR:"€", ARS:"$ARS", MXN:"$MX", COP:"$COP", BRL:"R$", BTC:"₿", ETH:"Ξ" };

module.exports = {
  name: ["moneda", "convert", "cambio", "divisa"],
  description: "💱 Convertir entre divisas y criptomonedas",
  category: "🔧 UTILIDADES",
  execute: async ({ reply, args }) => {
    if (args.length < 3) return reply("❌ Uso: .moneda <cantidad> <DE> <A>\nEjemplo: .moneda 100 USD ARS");
    const [cantidad, de, a] = [parseFloat(args[0]), args[1].toUpperCase(), args[2].toUpperCase()];
    if (isNaN(cantidad)) return reply("❌ Cantidad inválida.");
    try {
      const { data } = await axios.get(`https://api.exchangerate.host/convert?from=${de}&to=${a}&amount=${cantidad}`, { timeout: 8000 });
      if (!data.result) throw new Error("Sin resultado");
      const simDe = PARES[de] || de;
      const simA = PARES[a] || a;
      await reply(`💱 *Conversión de divisas*\n\n${simDe} ${cantidad} ${de}\n= *${simA} ${data.result.toFixed(4)} ${a}*\n\n_Tasa: 1 ${de} = ${(data.result/cantidad).toFixed(4)} ${a}_`);
    } catch {
      await reply(`❌ No se pudo convertir ${de} → ${a}. Verifica los códigos de moneda.`);
    }
  },
};
