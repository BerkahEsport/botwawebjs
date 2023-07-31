import { createHash } from 'crypto'
let handler = async function ( m, { args } )
{
  let user = global.db.data.users[m.sender]
  let sn = createHash('md5').update(m.sender).digest('hex')
  if (!args[0]) return conn.reply(m.chat,`𝘼𝙣𝙙𝙖 𝙮𝙖𝙠𝙞𝙣 𝙞𝙣𝙜𝙞𝙣 𝙪𝙣𝙧𝙚𝙜𝙞𝙨𝙩𝙧𝙖𝙨𝙞? \n\n*📮 SN:* ${sn}\n\nUNREGISTER\n.unreg [Serial Number]`,m)
  if (args[0] !== sn) return conn.reply(m.chat,`ꜱᴇʀɪᴀʟ ɴᴜᴍʙᴇʀ ʏᴀɴɢ ᴋᴀᴍᴜ ᴍᴀꜱᴜᴋᴋᴀɴ ꜱᴀʟᴀʜ.! \n\n*📮 SN:* ${sn}\n\nUNREGISTER\n.unreg [Serial Number]`,m)

  user.registered = false
  m.reply('```Succes Unregistrasi !```')
}
handler.help = ['unregister [SN|SERIAL NUMBER]']
handler.tags = ['xp']

handler.command = /^unreg(ister)?$/i
handler.register = true


handler.login = true
handler.text = true
export default handler 