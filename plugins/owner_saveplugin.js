import { writeFileSync } from 'fs';
let handler = async (m, { text, usedPrefix, command }) => {
    try { 
    if (m.hasQuotedMsg) {
        let path = `./plugins/${text}`
        let quoted = await m.quoted.text
        await writeFileSync(path, quoted)
        m.reply(`Tersimpan di ${text}`)
    } else if (text.includes('|')) {
        let path = `./plugins/${text.split('|')[0]}.js`
        let isi = text.split('|')[1]
        await writeFileSync(path, isi)
        m.reply(`Tersimpan di ${path}`) 
  } else m.reply(`Hmm.. Teksnya mana?\n\nPenggunaan:\n${usedPrefix + command} [teks]\n\nContoh:\n${usedPrefix + command} tes.js| import fetch from "node-fetch \nAtau balas pesan dan ketik nama pluginnya.`)
  
    } catch(e) {
    m.reply(`${e}Hmm.. Teksnya mana?\n\nPenggunaan:\n${usedPrefix + command} [teks]\n\nContoh:\n${usedPrefix + command} tes.js| import fetch from "node-fetch`)
    }
     } 

handler.help = ['sf']
handler.tags = ['owner']
handler.command = /^(sf)$/i

handler.rowner = true

export default handler 

// <===== Buat nambahin plugin lewat chat BOT =====>
// Credit @moexti