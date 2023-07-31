import fs from 'fs'
let handler = async ( m, { conn, } ) =>
{
   
    if ( m.text == `permisi` || m.text == `oi` || m.text == `Oi` || m.text == `Hallo permisi` || m.text == `Hallo` || m.text == `Hi` || m.text == `Jawab bot` || m.text == `Halo permisi`) {
  let text = `*❖『 ^𝐀𝐃𝐀 𝐀𝐏𝐀 𝐊𝐀𝐊𝐀^ 』❖*`
conn.sendMessage(m.chat, global.logo.thumb, {caption: text, quoted: m})
} 
        
        
         
    if ( m.body == `tes` || m.text == `Tes` || m.text == `bot` || m.text == `Bot` || m.text == `Hlo` || m.text == `p` || m.text == `P` || m.text == `Hai` || m.text == `Halo`) 
    {
         let info = `Nani? (・o・)
Ketik .menu untuk menampilkan daftar *MENU*.
*ɴʙ:* ᴜɴᴛᴜᴋ ᴘᴇɴɢɢᴜɴᴀ ᴡʜᴀᴛꜱᴀᴘᴘ ʙɪꜱɴɪꜱ / ʙᴏᴛ ᴛɪᴅᴀᴋ ᴍᴇʀᴇꜱᴘᴏɴ ꜱɪʟᴀʜᴋᴀɴ ᴋᴇᴛɪᴋ .home`

        conn.sendMessage(m.chat, global.logo.thumb, {caption: info, quoted: m})
    }
     
    }
handler.customPrefix = /^(tes|bot|p|P|hlo|halo|hai|Tes|permisi|oi|Hallo|Jawab bot|Hallo permisi|Oi)$/i
handler.command = new RegExp


handler.login = true
handler.text = true
export default handler 