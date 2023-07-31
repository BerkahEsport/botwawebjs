import fs from 'fs'
import path from 'path'
let handler = async (m, { args, text }) => {
const directory = './tmp';

fs.readdir(directory, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join(directory, file), err => {
      if (err) throw err;
    });
  }
} )
  conn.reply( m.chat, '✔️ ʙᴇʀʜᴀꜱɪʟ ᴍᴇɴɢʜᴀᴘᴜꜱ ꜱᴇʟᴜʀᴜʜ ꜰɪʟᴇ ᴅɪ ᴅɪʀᴇᴋᴛᴏʀɪ ᴛᴍᴘ.', m )
}
handler.help = ['cleartmp']
handler.tags = ['owner']
handler.command = /^(cleartmp)$/i

handler.mods = true

//handler.limit = true
handler.login = true
handler.text = true
export default handler 