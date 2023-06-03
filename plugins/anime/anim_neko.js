import fetch from "node-fetch";
let handler = async (m, { conn }) => {
function pickRandom ( list )
  { return list[ Math.floor( Math.random() * list.length ) ] }
let neko = await (await fetch(`https://raw.githubusercontent.com/BerkahEsport/api-be/main/lib/anime/nsfw/nsfwNeko.json`)).json()
let nekos = pickRandom(neko)
//<---PEMBATAS--->
 conn.sendFile(m.from, nekos, '', global.ty, m);
}
handler.command = /^(neko)$/i
handler.tags = ['anime']
handler.help = ['neko']

handler.register = true
handler.login = true
handler.text = true
export default handler 