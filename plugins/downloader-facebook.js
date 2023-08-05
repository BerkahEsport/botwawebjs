//import fetch from 'node-fetch' 
import {savefrom } from '@bochilteam/scraper';
import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command,isPrems }) => {
if(!isPrems) {
  let user = global.db.data.users[ m.sender ]
  if (+new Date - user.dltime < cooldown ) throw `ᴄᴏᴍᴍᴀɴᴅ ᴛᴇʀʟᴀʟᴜ ᴄᴇᴘᴀᴛ ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ *${ ( ( user.dltime + cooldown ) - (+new Date()) ).toTimeString() }* ʟᴀɢɪ.
ᴜɴᴛᴜᴋ ᴜꜱᴇʀ *ᴘʀᴇᴍɪᴜᴍ* ᴛɪᴅᴀᴋ ᴀᴅᴀ ᴄᴏᴏʟᴅᴏᴡɴ ${command.toUpperCase()}.`.trim()
  user.dltime = new Date * 1 
   }
   if (!text) throw '*Masukkan link*\n Contoh: https://www.facebook.com/DramaFacbook21/videos/1775049149358700/?app=fbl'
  
try {
let data = await (await fetch(`https://xzn.wtf/api/download?url=${text}&apikey=beta`)).json()
    conn.sendFile(m.chat, data.url[1].url, ``, `🔗 *Judul* ${data.meta.title} \n🔗 *Durasi* ${data.meta.duration}`, m)
} catch {
   
  let json = await savefrom(text)
  let hasil = `⚡ Hai ${await conn.getName(m.sender)}

⌚ ID: ${json[0].id} 
📌 Quality:${json[0].url?.type}
📎 URL: ${json[0].url}
📌 Source: ${json[0].hosting}
⏲️ Image: ${json[0].thumb}
📌 SD: ${json[0].sd.url}`.trim() 
conn.sendFile(m.chat, json[0].sd.url, `${json[0].id ? json[0].id : ''}.mp4`, hasil, m)
  }
}
  

handler.help = ['facebook'].map(v => v + ' [url]')
handler.tags = ['downloader']
handler.limit = 5
handler.command = /^((facebook|fb)(downloder|dl)?)$/i
handler.register = true

handler.login = true
handler.text = true
export default handler 
