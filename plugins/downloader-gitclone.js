import fs from 'fs'
import fetch from 'node-fetch'
const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let handler = async (m, { args,conn,usedPrefix, command,isPrems,text }) => {
if(!isPrems) {
  let user = global.db.data.users[ m.sender ]
  if ( +new Date - user.dltime < cooldown ) throw `ᴄᴏᴍᴍᴀɴᴅ ᴛᴇʀʟᴀʟᴜ ᴄᴇᴘᴀᴛ ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ *${ ( ( user.dltime + cooldown ) - (+new Date()) ).toTimeString() }* ʟᴀɢɪ.
ᴜɴᴛᴜᴋ ᴜꜱᴇʀ *ᴘʀᴇᴍɪᴜᴍ* ᴛɪᴅᴀᴋ ᴀᴅᴀ ᴄᴏᴏʟᴅᴏᴡɴ ${command.toUpperCase()}.`.trim()
  user.dltime = +new Date * 1 
   }

    if ( !args[ 0 ] ) throw `Example user ${ usedPrefix }${ command } BerkahEsport`
    if (!regex.test(args[0])) throw 'link salah!'
    let [_, name, repo] = args[0].match(regex) || []
    repo = repo.replace(/.git$/, '')
    let url = `https://api.github.com/repos/${name}/${repo}/zipball`
    let filename = (await fetch(url, { method: 'HEAD' })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
   await conn.sendFile(m.chat, url, filename, null, m)
}
handler.help = ['gitclone [username/repo]']
handler.tags = ['downloader']
handler.command = /gitclone/i
handler.register = true
handler.limit = 5


handler.login = true
handler.text = true
export default handler