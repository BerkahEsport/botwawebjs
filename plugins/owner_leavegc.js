let handler = async (m, { conn, args, command }) => { 
    if (!args[0]) return m.reply(`Masukkan ID groups.`)
    let group = args[0].replace( 'https://wa.me/', '' )
    if (!global.db.data.chats[group]?.expired) global.db.data.chats[group].expired = +new Date()
    let out = await conn.getChatById(group)
    let data = global.nomor.rowner.map((number) => number + '@c.us')// if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data]
    let teksout = `Waktunya *${conn.user.pushname }* untuk meninggalkan grup..
Silahkan hubungi: 
https://wa.me/${ global.nomor.rowner[0] }?text=Bang%20mau%20perpanjang%20BOT%0ASewaBot%20:%0A1%20bulan%20=%20Rp.8000,00%0APembayaran%20via%20LinkAja,Dana%20atau%20scan%20QR%20Code%20di%20foto%20Profil%20BOT`
await  conn.reply( group, teksout)
await conn.sendContact(group, data, 'Owner BE', m)
.then( async () => {
global.db.data.chats[group].expired = +new Date()
}).then( async () => {
m.reply(`✔️ ꜱᴜᴋꜱᴇꜱ ᴋᴇʟᴜᴀʀ ᴅᴀʀɪ ɢʀᴏᴜᴘ : ${await conn.getName(group)}`)
await out.leave()
})
        }
handler.help = ['leavegc', 'out']
handler.tags = ['owner']
handler.command = /^(out|leavegc)$/i
handler.rowner = true
handler.register = true

handler.login = true
handler.text = true
export default handler