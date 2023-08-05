import axios from 'axios';
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import { tiktokdl } from '@bochilteam/scraper'

let handler = async (m, { args,conn,usedPrefix, command,isPrems }) => {
if(!isPrems) {
  let user = global.db.data.users[ m.sender ]
  const cooldown = 180000
  if (+new Date - user.dltime < cooldown ) throw `ᴄᴏᴍᴍᴀɴᴅ ᴛᴇʀʟᴀʟᴜ ᴄᴇᴘᴀᴛ ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ *${ ( ( user.dltime + cooldown ) - (+new Date()) ).toTimeString() }* ʟᴀɢɪ.
ᴜɴᴛᴜᴋ ᴜꜱᴇʀ *ᴘʀᴇᴍɪᴜᴍ* ᴛɪᴅᴀᴋ ᴀᴅᴀ ᴄᴏᴏʟᴅᴏᴡɴ ${command.toUpperCase()}.`.trim()
  user.dltime = new Date * 1 
   }
    if (!args[0]) throw `ᴄᴏɴᴛᴏʜ ᴘᴇɴɢɢᴜɴᴀᴀɴ: ${usedPrefix}${command} [ʟɪɴᴋ ᴛɪᴋᴛᴏᴋ] \nᴄᴏɴᴛᴏʜ: ${usedPrefix}${command} https://www.tiktok.com/@omagadsus/video/7025456384175017243`
   try{
    m.reply(global.teks.wait)
    const { author: { nickname }, video, description } = await tiktokdl(args[0])
    const url = video.no_watermark || video.no_watermark_hd || video.with_watermark || video.no_watermark_raw
    let isi = await shortUrl(url)
  let caption = `𝐋𝐢𝐧𝐤 𝐚𝐰𝐚𝐥: ${ args[ 0 ]}
    
  *𝐋𝐢𝐧𝐤 𝐝𝐨𝐰𝐧𝐥𝐨𝐚𝐝*
*🗂️ ɴᴏᴡᴀᴛᴇʀᴍᴀʀᴋ:* ${isi}
${description ? `*📨  ᴅᴇꜱᴋʀɪᴘꜱɪ:* ${description}` : ``}

`.trim()
    await conn.sendFile(m.chat,url, 'tiktok.mp4', caption+'\n'+ty, m) }
    catch (e) {
      conn.reply(global.nomor.ownerid, `${e}`, null)
    const { thumbnail, video, audio } = await ttdl(args[0])
    const url = video
    await conn.sendMessage(m.chat, { video: { url: url }},m) 

    }
}
handler.help = ['tiktokdl'].map(v => v + ' [url]')
handler.tags = ['downloader']
handler.command = /^(tiktokdl|ttdl|tt)$/i
handler.register = true
handler.limit = 5


handler.login = true
handler.text = true
export default handler 

async function shortUrl(url) {
  url = encodeURIComponent(url)
  let res = await fetch(`https://is.gd/create.php?format=simple&url=${url}`)
  if (!res.ok) throw false
  return await res.text()
  }

async function ttdl (url) {
    if (!/tiktok/.test(url)) return error.link;
    const gettoken = await axios.get("https://tikdown.org/id");
    const $ = cheerio.load(gettoken.data);
    const token = $("#download-form > input[type=hidden]:nth-child(2)").attr(
        "value"
    );
    const param = {
        url: url,
        _token: token,
    };
    const {
        data
    } = await axios.request("https://tikdown.org/getAjax?", {
        method: "post",
        data: new URLSearchParams(Object.entries(param)),
        headers: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "user-agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36",
        },
    });
    let getdata = cheerio.load(data.html);
    if (data.status) {
        return {
            status: true,
            thumbnail: getdata("img").attr("src"),
            video: getdata("div.download-links > div:nth-child(1) > a").attr("href"),
            audio: getdata("div.download-links > div:nth-child(2) > a").attr("href"),
        };
    } else
        return {
            status: false,
        };
};