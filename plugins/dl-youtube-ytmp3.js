let limit = 80
import fetch from 'node-fetch'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
let handler = async (m, { conn, args, isPrems, isOwner }) => {
  if (!args || !args[0]) throw ('ᴛᴏʟᴏɴɢ ᴍᴀꜱᴜᴋᴋᴀɴ ᴜʀʟ ʏᴏᴜᴛᴜʙᴇ. ᴄᴏɴᴛᴏʜ: .yta https://youtu.be/jySbH-dLrYA')
  if (!args[0].startsWith('https://youtu')) throw ('ʟɪɴᴋ ʏᴏᴜᴛᴜʙᴇ ʏᴀɴɢ ᴋᴀᴍᴜ ᴋɪʀɪᴍ ꜱᴀʟᴀʜ! ᴋɪʀɪᴍ ʟɪɴᴋ ʏᴀɴɢ ʙᴇɴᴀʀ.')
  let chat = global.db.data.chats[m.chat]
  const isY = /y(es)/gi.test(args[1])
  const { thumbnail, audio: _audio, title } = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0]))
  const limitedSize = (isPrems || isOwner ? 99 : limit) * 1024
  let audio, source, res, link, lastError, isLimit
  await m.reply(global.teks.wait)
  for (let i in _audio) {
    try {
      audio = _audio[i]
      isLimit = limitedSize < audio.fileSize
      if (isLimit) continue
      link = await audio.download()
      if (link) res = await fetch(link)
      isLimit = res?.headers.get('content-length') && parseInt(res.headers.get('content-length')) < limitedSize
      if (isLimit) continue
    } catch (e) {
      audio = link = null
      lastError = e
    }
  }
  if ((!link || !res.ok) && !isLimit) throw 'Error: ' + (lastError || `Tidak dapat mendownload audio`)
  if (!isY && !isLimit) await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', `
*❖『 YOUTUBE 』❖*

*✣ Title:* ${title}
*✣ Type:* mp3
*✣ Filesize:* ${audio.fileSizeH}

*L O A D I N G. . .*
`.trim(), m)

  if (!isLimit) await conn.sendDocs(m.chat, link,  title, `
*❖『 YOUTUBE 』❖*

*✣ Title:* ${title}
*✣ Type:* mp3
*✣ Filesize:* ${audio.fileSizeH}

*L O A D I N G. . .*
`.trim(), m)
}
handler.help = ['mp3'].map(v => 'yt' + v + ` [url] [tanpa pesan]`)
handler.tags = ['downloader']
handler.command = /^ytmp3$/i

handler.register = true
handler.limit = 5


handler.login = true
handler.text = true
export default handler 