import fetch from "node-fetch";
import func from "../lib/func.js";
let handler = async (m, { conn, text }) => {
  if (!text) throw ('ᴄᴀʀɪ ᴀᴘᴀ ᴛᴜᴀɴ? ᴘᴇɴɢɢᴜɴᴀᴀɴ: .yts rick roll')
  let results = await func.fetchJson(`https://api.berkahesport.repl.co/api/yutub/search?text=${text}&apikey=berkahesport`)// (await fetch(`https://api.berkahesport.repl.co/api/yutub/search?text=${text}&apikey=berkahesport`)).json()
  let teks = results.result.map(v => `
📌 *ᴊᴜᴅᴜʟ:* ${v.title}
🔗 *ᴜʀʟ:* ${v.url}
⏲️ *ᴘᴜʙʟɪꜱʜ:* ${v.ago}
⌚ *ᴅᴜʀᴀꜱɪ:* ${v.timestamp}
👁️ *ᴅɪʟɪʜᴀᴛ:* ${v.views}
 `.trim()).join('\n\n*=========================*\n\n')
 conn.reply(m.chat, '*───「 ★彡[ʏᴏᴜᴛᴜʙᴇ ꜱᴇᴀʀᴄʜ]彡★ 」───*\n\n' + teks, m)
}
handler.help = ['play [pencarian]', 'yts [pencarian]']
handler.tags = ['internet','downloader']
handler.command = /^(play|yts)$/i


handler.login = true
handler.text = true
export default handler 