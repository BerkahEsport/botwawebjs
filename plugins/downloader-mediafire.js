import {lookup} from 'mime-types'
import axios from 'axios'
import cheerio from 'cheerio'
let handler = async (m, { args,conn,usedPrefix, command,isPrems }) => {
if(!isPrems) {
  let user = global.db.data.users[ m.sender ]
  if (+new Date - user.dltime < cooldown ) throw `ᴄᴏᴍᴍᴀɴᴅ ᴛᴇʀʟᴀʟᴜ ᴄᴇᴘᴀᴛ ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ *${ ( ( user.dltime + cooldown ) - (+new Date()) ).toTimeString() }* ʟᴀɢɪ.
ᴜɴᴛᴜᴋ ᴜꜱᴇʀ *ᴘʀᴇᴍɪᴜᴍ* ᴛɪᴅᴀᴋ ᴀᴅᴀ ᴄᴏᴏʟᴅᴏᴡɴ ${command.toUpperCase()}.`.trim()
  user.dltime = new Date * 1 
   }

    if (!args[0]) throw `Use example ${usedPrefix}${command} https://www.mediafire.com/file/941xczxhn27qbby/GBWA_V12.25FF-By.SamMods-.apk/file`
    let res = await mediafireDl(args[0])
    let { size,link } = res
    let mimetype = await lookup(link)
    let seplit = args[0].split('/')
			let nama = seplit[5]
    let caption = `
*💌 Name:* ${nama}
*📊 Size:* ${size}
*🔗 Link:* ${link}
`.trim()
    m.reply(`${wait}\n\n${caption}`)
    await conn.sendFile(m.chat, link, nama, '', m, null, { mimetype: mimetype, asDocument: true })
}
handler.help = ['mediafire'].map(v => v + ' [url]')
handler.tags = ['downloader']
handler.command = /^(mediafire|mf)$/i

handler.limit = 10


handler.login = true
handler.text = true
export default handler 


async function mediafireDl(link) {
	return new Promise(async (resolve, reject) => {
		axios.get(link).then(res => {
			const $ = cheerio.load(res.data)
			const link = $('a#downloadButton').attr('href')
			const size = $('a#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '')
			
			const hasil = {
				size: size,
				link: link
			}
			resolve(hasil)
				.catch(reject)
		})
			.catch(reject)
	})
}