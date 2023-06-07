import fetch from 'node-fetch'

let handler = async ( m, { conn } ) =>
{

  await m.reply(wait)
  let src = await (await fetch('https://raw.githubusercontent.com/BerkahEsport/api-be/main/lib/anime/couple.json')).json()
  let json = src[Math.floor(Math.random() * src.length)]
 await conn.sendFile(m.chat, json.male, '', ty, m)
 await conn.sendFile(m.chat, json.female, '', ty, m)
}

handler.help = ['ppcp']
handler.tags = ['anime']
handler.command = /^ppcp$/i
handler.register = true


handler.login = true
handler.text = true
export default handler 