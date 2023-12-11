let limit = 40
import fetch from "node-fetch"
import { youtubedl, youtubedlv2 } from "@bochilteam/scraper";
let handler = async (m, { conn, args, isPrems, isOwner }) => {
  if (!args || !args[0]) throw ("ᴛᴏʟᴏɴɢ ᴍᴀꜱᴜᴋᴋᴀɴ ᴜʀʟ ʏᴏᴜᴛᴜʙᴇ. ᴄᴏɴᴛᴏʜ: .yta https://youtu.be/jySbH-dLrYA")
  if (!args[0].startsWith("https://youtu")) throw ("ʟɪɴᴋ ʏᴏᴜᴛᴜʙᴇ ʏᴀɴɢ ᴋᴀᴍᴜ ᴋɪʀɪᴍ ꜱᴀʟᴀʜ! ᴋɪʀɪᴍ ʟɪɴᴋ ʏᴀɴɢ ʙᴇɴᴀʀ.")
  const isY = /y(es)/gi.test(args[1])
  const { thumbnail, audio: _audio, title } = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0]))
  const limitedSize = (isPrems || isOwner ? 99 : limit) * 1024
  let audio, res, link, lastError, isLimit
  await m.reply(global.teks.wait)
  for (let i in _audio) {
    try {
      audio = _audio[i]
      isLimit = limitedSize < audio.fileSize
      if (isLimit) throw ("File yang anda unduh melebihi batas maksimal. Jika ingin maksimal silahkan menjadi member Premium.")
      link = await audio.download()
      if (link) res = await fetch(link)
      isLimit = res?.headers.get("content-length") && parseInt(res.headers.get("content-length")) < limitedSize
      if (isLimit) throw ("File yang anda unduh melebihi batas maksimal. Jika ingin maksimal silahkan menjadi member Premium.")
    } catch (e) {
      audio = link = null
      lastError = e
    }
  }
  if ((!link || !res.ok) && !isLimit) throw ("Error: " + (lastError || `Tidak dapat mendownload audio, coba pakai cara selanjutnya. Ketik .yt2mateA ${args[0]}`))
  if (!isY && !isLimit) await conn.sendFile(m.from, thumbnail, title.split(' ')[0], `
*❖『 YOUTUBE 』❖*

*✣ Title:* ${title}
*✣ Type:* mp3
*✣ Filesize:* ${audio.fileSizeH}

*L O A D I N G. . .*
`.trim(), m)

  if (!isLimit) await conn.sendFile(m.from, link,  title, `${title} - ${global.nama.bot}`, m, {asDocument: true})
}
handler.help = ["ytmp3 [url] [tanpa pesan]"]
handler.tags = ["downloader"]
handler.command = /^(ytmp3)$/i
handler.register = true
handler.login = true
handler.text = true
handler.limit = 5
export default handler 