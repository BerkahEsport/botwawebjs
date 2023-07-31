import { createHash } from 'crypto'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix }) {
  let sn = createHash('md5').update(m.sender).digest('hex')

conn.reply(m.chat,`*📮 SN:* ${sn}`,global.wm.author,m)
}

handler.help = ['ceksn']
handler.tags = ['xp']
handler.command = /^(ceksn)$/i
handler.register = true

handler.login = true
handler.text = true
export default handler 