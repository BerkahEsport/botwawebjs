let handler  = async (m, { conn, command, args }) => {
  let type = (args[0] || '').toLowerCase()
  let _type = (args[0] || '').toLowerCase()

//------- NOMOR
  let nowner = `${global.nomor.owner.split`@`[0]}@c.us`
  let teksnomor = `❖『 *OWNER* 』❖
• @${global.nomor.owner.split`@`[0]} •
------- ${global.nama.owner} -------

📮 *Note:*
• Owner tidak menerima save contact
• Owner berhak blockir tanpa alasan
• Berbicaralah yang sopan & tidak spam
• Owner Hanya merespon yang berkaitan dengan BOT
• No Telp`

//------------ BIO
let ppown = await conn.getProfilePicUrl(global.nomor.owner + '@c.us').catch(_ => global.logo.thumb) 
let teksbio = `❖『 *BIODATA* 』❖
*ɴᴀᴍᴇ:* ${global.nama.owner}
*ᴀɢᴇ:* 26ᵗʰ
*ᴄʟᴀss:* Wkwkwkwkwk...
*sᴛᴀᴛᴜs:* Married 

*ʙɪʀᴛʜᴅᴀʏ:* 13 Oktober 1996
*ᴀᴅᴅʀᴇss:* Indonesia, Jawa Tengah, Boyolali

📷 *Instagram:* ${global.sosmed.ig}
🐈 *Github:* ${global.sosmed.gh}
🥏 *Whatsapp* wa.me/${global.nomor.owner}

`.trim()


  try {
    if (/(creator|owner)/i.test(command)) {
      const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
        switch (type) {
          case 'nomor':
            conn.reply( m.chat, teksnomor, m, { contextInfo: { mentionedJid: [ nowner ] } } ).then( () =>
            { let data = global.owner.filter(([id, isCreator]) => id && isCreator)
              conn.sendContact(m.chat, data.map(([id, name]) => [id, name]), m)
            } )
            break
            case 'bio':
              conn.sendFile(m.chat,ppown,'', teksbio,m)
              break
            
          default:
            return await conn.sendMessage(m.chat, { text: 'Ketik _.owner nomor_ untuk meminta nomor. \n Ketik _.owner bio_ untuk melihat Biodata Owner.' }, { quoted: m })
        }
    } else if (/aoaooaoaooaoa/i.test(command)) {
      const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 :Math.min(1, count)
      switch (_type) {
        case 't':
          break
        case '':
          break

        default:
          return conn.reply( m.chat, caption, m)
      }
    }
  } catch (err) {
    m.reply("Error\n\n\n" + err.stack)
  }
}

handler.help = ['owner', 'creator']
handler.tags = ['main', 'info']
handler.command = /^(owner|creator)/i


handler.login = true
handler.text = true
export default handler 
