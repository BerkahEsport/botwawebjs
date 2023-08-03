/*
Mau ngapain mas? mau ganti nama ya?
Hargai lah yg buat,gw cape² ngebuat ini tapi kalian nya malah enak²an ubah nama doang.
Kalo mau ada nama kalian chat dulu ke owner BOTWAWEBJS, izin dulu biar sama² enak.
di tambahin nama boleh tapi di ilangin jangan mas.

http://wa.me/62895371549895?text=bg%20izin%20taroh%20nama%20di%20bot%20mu%20yak
*/
let handler = async (m, { conn, text }) => {
  conn.reply(m.chat, '```Sama - sama Bro. Semoga apa yang BOT miliki bermanfaat buat kamu bro...\nBantu donasi untuk mensupport OWNER agar terus updete BOT yak Bro...\nTHANKS YOUU BROOO...```', m)
}
handler.help = ['terimakasih']
handler.tags = ['main']
handler.command = /^thanksyou|tengkyu|terimakasih$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null


export default handler


