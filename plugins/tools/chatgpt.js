import axios from "axios";

let handler = async (m, { text, usedPrefix, command }) => {
    if(!text) return m.reply(`Masukkan teks yang mau ditanyakan ke OpenAI \nContoh: ${usedPrefix+command} Apa itu chat GPT?`)
  const response = await axios.get(
    `https://xzn.wtf/api/openai?text=${text}&apikey=free`,
    {
      responseType: "json",
    }
  );
  const v = (response.data)//.replace(/powered by: https:\/\/xznsenpai.xyz/gi, '');
  m.reply(v.result);
};
handler.help = ["ai"];
handler.tags = ["tools"];
handler.command = /^(ai)$/i;
handler.register = true;
export default handler;

// Dari requestan => https://github.com/ahlulmukh
// Dan di perbaiki sedikit ^_^