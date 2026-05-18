const LETRAS = {
  a:"/-\\|_|",b:"|_ |_|",c:" _|  |_",d:"|_ |_|",e:"|_ |_",f:"|_ |",
  g:" _|_ |_|",h:"| ||_|",i:"|_||_|",j:" _  _||_|",k:"|_/ \\ |_",
  l:"| |_|",m:"|V||  ||  |",n:"|\\ ||_\\|",o:" _ | || _|",p:"|_||",
  q:" _ | |\\_ \\",r:"|_||\\",s:" _|_ |_",t:"-|--|",u:"| || ||_|",
  v:"\\   /\\_/",w:"\\  /\\  /\\/",x:"\\ / X / \\",y:"\\ \\/ /_/",
  z:" _| / |_",
};

module.exports = {
  name: ["ascii", "letras", "texto-art"],
  description: "🔤 Convertir texto a arte ASCII",
  category: "🔧 UTILIDADES",
  execute: async ({ reply, args }) => {
    if (!args.length) return reply("❌ Uso: .ascii <texto>\nEjemplo: .ascii NOVA");
    const texto = args.join(" ").toLowerCase().slice(0, 10);
    const resultado = texto.split("").map(c => LETRAS[c] || c).join(" ");
    await reply(`🔤 *Arte ASCII*\n\n\`\`\`${resultado}\`\`\``);
  },
};
