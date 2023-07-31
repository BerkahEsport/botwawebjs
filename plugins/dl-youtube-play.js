import yts from 'yt-search'
let handler = async (m, { conn, text }) => {
  if (!text) throw ('ᴄᴀʀɪ ᴀᴘᴀ ᴛᴜᴀɴ? ᴘᴇɴɢɢᴜɴᴀᴀɴ: .yts rick roll')
  let results = await yts(text)
  let teks = results.all.map(v => {
    switch (v.type) {
      case 'video': return `
📌 *ᴊᴜᴅᴜʟ:* ${v.title}
🔗 *ᴜʀʟ:* ${v.url}
⏲️ *ᴘᴜʙʟɪꜱʜ:* ${v.ago}
⌚ *ᴅᴜʀᴀꜱɪ:* ${v.timestamp}
👁️ *ᴅɪʟɪʜᴀᴛ:* ${v.views}
 `.trim()
      case 'channel': return `
*Chanel:* ${v.name} 
*Link:* (${v.url})
*Subscriber:* ${v.subCountLabel} (${v.subCount})
*Total Video:* ${v.videoCount} video
`.trim()
    }
  }).filter(v => v).join('\n\n*=========================*\n\n')
 conn.reply(m.chat, '*───「 ★彡[ʏᴏᴜᴛᴜʙᴇ ꜱᴇᴀʀᴄʜ]彡★ 」───*\n\n' + teks, m)
}
handler.help = ['play [pencarian]', 'yts [pencarian]']
handler.tags = ['internet','downloader']
handler.command = /^(play|yts)$/i


handler.login = true
handler.text = true
export default handler 