import fetch from 'node-fetch'
let handler = async (m, { conn, text }) => {
let res = await fetch('https://raw.githubusercontent.com/BerkahEsport/api-be/main/lib/anime/sfw/loli.json')
let json = await res.json();
let url = json[Math.floor(Math.random() * json.length)]

const media = await MessageMedia.fromUrl(url)
await conn.sendMessage(m.from, media, {caption: ty})
}
handler.command = /^(loli)$/i
handler.tags = ['anime'] 
handler.help = ['loli']
// handler.register = true
export default handler
