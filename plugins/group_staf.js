import fs from 'fs';
let handler = async (m, { conn, participants, args }) => {
const pp = await conn.getProfilePict(m.chat).catch(_ => global.logo.thumb) || global.logo.thumb//await fs.readFileSync('./src/avatar_contact.png')
const groupAdmins = participants.filter(p => p.isAdmin)
const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v?.id?._serialized.split('@')[0]}`).join('\n▢ ')
const owner = participants.find(p => p.isSuperAdmin === true)?.id?.user || participants.find(p => p.isSuperAdmin === true)?.id?._serialized.split('@')[0] || `Tidak Ada`
const mentions =  groupAdmins.map(v => v.id._serialized)
let text = `
≡≡≡≡ *STAFF GRUP* ≡≡≡≡

_${m.metadata.subject}_
*Pendiri:* _${owner}_

┌─⊷ *ADMINS*
▢ ${listAdmin}
└───────────
`.trim()
try{
conn.sendMessage(m.chat, pp, {mentions , caption: text })
} catch (e) {m.reply(`${JSON.stringify(e)}`)}
}
handler.help = ['staff']
handler.tags = ['group']
handler.command = ['staff','listadmin'] 
handler.group = true

handler.login = true
handler.text = true
export default handler 