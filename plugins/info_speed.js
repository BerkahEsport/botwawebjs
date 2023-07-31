import cp from 'child_process'
import { promisify } from 'util'
let handler = async ( m ) =>
{
            m.reply('*ꜱᴇᴅᴀɴɢ ᴘʀᴏꜱᴇꜱ ᴋᴇᴄᴇᴘᴀᴛᴀɴ ɪɴᴛᴇʀɴᴇᴛ...*')
            let exec = promisify(cp.exec).bind(cp)
          let o
          try {
          o = await exec('python speed.py')
          } catch (e) {
          o = e
         } finally {
        let { stdout, stderr } = o
        if (stdout.trim()) m.reply(stdout)
        if (stderr.trim()) m.reply(stderr)
            }

}

handler.help = ['speed']
handler.tags = ['info']

handler.command = /^(speed)$/i


handler.login = true
handler.text = true
export default handler 
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}