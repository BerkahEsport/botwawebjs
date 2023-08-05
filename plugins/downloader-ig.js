import axios from 'axios';
import cheerio from 'cheerio';
let handler = async (m, { args,conn,usedPrefix, command,isPrems }) => {
if(!isPrems) {
  let user = global.db.data.users[ m.sender ]
  if (+new Date - user.dltime < cooldown ) throw `ᴄᴏᴍᴍᴀɴᴅ ᴛᴇʀʟᴀʟᴜ ᴄᴇᴘᴀᴛ ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ *${ ( ( user.dltime + cooldown ) - (+new Date()) ).toTimeString() }* ʟᴀɢɪ.
ᴜɴᴛᴜᴋ ᴜꜱᴇʀ *ᴘʀᴇᴍɪᴜᴍ* ᴛɪᴅᴀᴋ ᴀᴅᴀ ᴄᴏᴏʟᴅᴏᴡɴ ${command.toUpperCase()}.`.trim()
  user.dltime = new Date * 1 
   }

    if ( !args[ 0 ] ) throw `Contoh penggunaan ${ usedPrefix }${ command } https://www.instagram.com/p/ByxKbUSnubS/?utm_source=ig_web_copy_link`
   
    try {
    let hasil = await igdl(args[0])
    await m.reply(global.teks.wait)
   conn.sendFile(m.chat, (hasil[0].url || hasil[0].sourceUrl), 'instagram.mp4', `★彡[*ɪɴꜱᴛᴀɢʀᴀᴍ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*]彡★ \n\n🔗 *Url:* ${hasil[0].url || hasil[0].sourceUrl}`, m) 
 
} catch (e) { m.reply(`ᴍᴜɴɢᴋɪɴ ʟɪɴᴋ ʏᴀɴɢ ᴀɴᴅᴀ ᴋɪʀɪᴍ ꜱᴀʟᴀʜ!!! \nᴀᴛᴀᴜ ꜱᴇᴅᴀɴɢ ᴇʀʀᴏʀ!!!`)
await conn.reply(global.nomor.ownerid, `${e}`, m)
}

}
handler.help = ['ig'].map(v => v + ' [url]')
handler.tags = ['downloader']
handler.command = /^(ig(dl)?)$/i


handler.limit = 3
handler.register = true
handler.login = true
handler.text = true
export default handler 

async function igdl(insta_url) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          "https://saveinsta.net/igram.php#downloadhere",
          {
            link: insta_url,
          }
        );
        const html = response.data;
        const $ = cheerio.load(html);
        const urls = $('a[target="_blank"]')
          .map((i, a) => $(a).attr("href"))
          .get();
        resolve([{ status: 200, url: urls }]);
      } catch (error) {
        reject({ status: 404, result: "No url found" });
      }
    });
  }

  async function download(url) {
    try {
        let Get_Data = await axios.post("https://igram.world/api/convert", {url: url})
        let Get_Result = Get_Data.data
        let get_url = Get_Result.url
        let get_caption = Get_Result.meta.title
        return {
          caption: get_caption,
          url: get_url
        }
    } catch (error) {
      return 'ERROR';
    }
  }