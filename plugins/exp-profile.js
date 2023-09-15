import PhoneNumber from 'awesome-phonenumber';
import fs from 'fs';
let handler = async (m, { conn }) => {
  let user = db.data.users[m.sender]
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let pp = await conn.getProfilePict(who).catch(_ => fs.readFileSync('./src/avatar_contact.png'))
    let { premium, level, limit, exp, lastclaim, registered, regTime, age } = global.db.data.users[who]
    let username = await conn.getName(who).catch(_ => 'User BE')
    let name = registered ? global.db.data.users[who].name : ''
    let str = `
]────────❏ *ᴘʀᴏꜰɪʟᴇ* ❏────────[
💌 • *ɴᴀᴍᴀ:* ${username} 
🎐 • *Username:* ${name}
📧 • *Tag:* @${who.replace(/@.+/, '')}
📞 • *Number:* ${PhoneNumber('+' + who.replace('@c.us', '')).getNumber('international')}
🔗 • *Link:* https://wa.me/${who.split`@`[0]}
🎨 • *Age:* ${registered ? age : ''}
🌟 • *Premium:* ${premium ? "✅"+`\n⏰ • *PremiumTime:* 
${clockString(user.premiumTime)}` :"❌"}
📑 • *Registered:* ${registered ? '✅': '❌'}
`.trim()
    conn.sendFile(m.chat,(pp === undefined ? fs.readFileSync('./src/avatar_contact.png') : pp), '', str, m)
}
handler.help = ['pp [@user]']
handler.tags = ['xp']
handler.command = /^pp$/i

handler.login = true
handler.text = true
export default handler 


function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, ' *Days ☀️*\n ', h, ' *Hours 🕐*\n ', m, ' *Minute ⏰*\n ', s, ' *Second ⏱️* '].map(v => v.toString().padStart(2, 0)).join('')
}