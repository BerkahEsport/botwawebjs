import fetch from 'node-fetch';
import axios from 'axios';
import cheerio from 'cheerio';

let timeout = 90000
let poin = 100
let handler = async (m, { conn, usedPrefix,command,isPrems }) => {
if(!isPrems) {
  let user = global.db.data.users[ m.sender ]
  const cooldown = 120000
  if (+new Date - user.tebaktime < cooldown ) throw `ᴄᴏᴍᴍᴀɴᴅ ᴛᴇʀʟᴀʟᴜ ᴄᴇᴘᴀᴛ ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ *${ ( ( user.tebaktime + cooldown ) - (+new Date()) ).toTimeString() }* ʟᴀɢɪ.
ᴜɴᴛᴜᴋ ᴜꜱᴇʀ *ᴘʀᴇᴍɪᴜᴍ* ᴛɪᴅᴀᴋ ᴀᴅᴀ ᴄᴏᴏʟᴅᴏᴡɴ ${command.toUpperCase()}.`.trim()
  user.tebaktime = new Date * 1 
   }
    conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {}
    let id = m.chat
    if (id in conn.tebakgambar) {
        conn.reply(m.chat, 'ᴍᴀꜱɪʜ ᴀᴅᴀ ꜱᴏᴀʟ ʙᴇʟᴜᴍ ᴛᴇʀᴊᴀᴡᴀʙ ᴅɪ ᴄʜᴀᴛ ɪɴɪ!', conn.tebakgambar[id][0])
        throw false
    }

    //let tebakgambar = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json')).json();
    let json = await tebakgambar() //.getRandom()
    let caption = `
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hinttg untuk hint
Bonus: ${poin} XP
    `.trim()
    conn.tebakgambar[id] = [
        await conn.sendFile(m.chat, json.img, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakgambar[id])
            conn.reply(m.chat, `*ᴡᴀᴋᴛᴜ ʜᴀʙɪꜱ!*\nᴊᴀᴡᴀʙᴀɴɴʏᴀ ᴀᴅᴀʟᴀʜ *${json.jawaban}*`, conn.tebakgambar[id][0])
            delete conn.tebakgambar[id]
        }, timeout)
    ]
}
handler.help = ['tebakgambar']
handler.tags = ['game']
handler.command = /^tebakgambar/i


handler.login = true
handler.text = true
export default handler

async function tebakgambar() {
  let random_level = Math.floor(Math.random() * 136)
  let random_eq = Math.floor(Math.random() * 20)
  return axios.get(`https://jawabantebakgambar.net/level-${random_level}/`).then((val) => {
    let url = "https://jawabantebakgambar.net"
    const $ = cheerio.load(val.data)
    let href = $("ul > * > a").eq(random_eq)
    let jwbn = href.find("span").text()
    let img = href.find("img").attr("data-src")
    let src = url + img
    let petunjuk = jwbn.replace(/[AIUEO|aiueo]/g, "_")
    return {
      img: src,
      jawaban: jwbn,
      deskripsi: petunjuk
    }
  })

}