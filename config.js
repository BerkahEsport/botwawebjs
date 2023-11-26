import fs from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
/*============== ɪɴꜰᴏ ᴏᴡɴᴇʀ ==============*/
global.nama = {
  owner: 'ミ★ ᴍᴏᴇxᴛɪ ★彡',
  bot: 'ʙᴇʀᴋᴀʜᴇꜱᴘᴏʀᴛ.ɪᴅ'
}
/*============== WHATSAPP ==============*/
global.group = {
  id: '120363041058702901@g.us',
  ofcid: '62859106980383-1632727122@g.us',
  rpg: 'https://chat.whatsapp.com/CxIlUZlW3lD7eH4LLLWYoZ',
  gc1: 'https://chat.whatsapp.com/JKdIWr5fj990Ux2oqTjTo5',
  gc2: 'https://chat.whatsapp.com/C4Qax9BYH9Q2DbFeRQRmRD'
}
/*============== SOCIAL ==============*/
global.sosmed = {
  yt: 'https://m.youtube.com/channel/UCG_Xj6eHBMaW9HTHTya9q6w',
  ig: 'https://instagram.com/berkahesport.id/',
  fb: 'https://web.facebook.com/berkahesport.id/',
  gh: 'https://github.com/berkahesport/'
}
/*============== PAYMENT ==============*/
global.pay = { 
  dana: '0895371549895',
  linkaja: '0895371549895',
  pulsa: '0895371549895',
  pulsa2: '089513602923' }
/*============== NOMOR ==============*/
global.nomor = {
  bot: '6289654279897', // Ganti dengan nomor botmu untuk di linking device.
  owner: '62895375950107',
  rowner: ['62895375950107', '62895371549895', '62815725878338'],
  mods: ['62895375950107', '62895371549895'],
  ownerid: '62895375950107@c.us'
}
/*============== WATERMARK ==============*/
global.wm = {
  bot: ' 「 ꧁༒☬𝓑𝓔𝓡𝓚𝓐𝓔𝓢𝓟𝓞𝓡𝓣.𝓘𝓓☬༒꧂ 」',
  bot2: '🅱🅴🆁🅺🅰🅴🆂🅿🅾🆁🆃.🅸🅳',
  bot3: '⫹⫺ ★彡[ʙᴇʀᴋᴀᴇꜱᴘᴏʀᴛ.ɪᴅ]彡★',
  titlebot: `⫹⫺ RPG BOT Whatsapp | By ${global.nama.bot}`,
  author: '     「 *@爪ㄖ乇乂ㄒ丨* 」'
}
/*============== LOGO ==============*/
global.logo = {
  thumb: 'https://telegra.ph/file/47b3652155f158b931bda.jpg',
  be: 'https://i.ibb.co/YTXmJfF/berkahesport.png',
  imagebot: 'https://raw.githubusercontent.com/BerkahEsport/api-be/main/tmp/gmbr/logo2.png',
  giflogo: 'https://telegra.ph/file/a46ab7fa39338b1f54d5a.mp4',
  fla: 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text='
}
/*============== TEXT ==============*/
global.teks = {
  wait: '```「▰▰▰▰▱▱▱▱▱▱」Loading...```',
  waits: ['```「▰▱▱▱▱▱▱▱▱▱」Loading...```','```「▰▰▱▱▱▱▱▱▱▱」Loading...```','```「▰▰▰▱▱▱▱▱▱▱」Loading...```','```「▰▰▰▰▱▱▱▱▱▱」Loading...```','```「▰▰▰▰▰▱▱▱▱▱」Loading...```'],
  eror: '```404 error```',
  rpg: `Fitur Rpg Dimatikan\nKetik *!enable* *rpg* untuk menggunakan fitur ini!\nKalo Mau main Disini aja\nhttps://chat.whatsapp.com/CxIlUZlW3lD7eH4LLLWYoZ`,
  nsfw: 'Fitur NSFW Dimatikan\nKetik *!enable* *nsfw* untuk menggunakan fitur ini!\n“Katakanlah kepada orang laki-laki yang beriman: Hendaklah mereka menahan pandanganya, dan memelihara kemaluannya; … Katakanlah kepada wanita yang beriman: Hendaklah mereka menahan pandangannya, dan kemaluannya, dan janganlah mereka Menampakkan perhiasannya, kecuali yang (biasa) nampak dari padany,” \n(TQS. Al-Nur [24]: 30-31).',
  ty: '💭 ɪɴɪ ʜᴀꜱɪʟɴʏᴀ... \nᴊᴀɴɢᴀɴ ʟᴜᴘᴀ ꜱᴜᴘᴘᴏʀᴛ ɪɢ @ʙᴇʀᴋᴀʜᴇꜱᴘᴏʀᴛ.ɪᴅ ʏᴀᴋ...  \n👍 ᴛʜᴀɴᴋꜱ ʏᴏᴜ...',
  subs: 'Jangan liat doang, subscribe dulu dong.. \n https://m.youtube.com/channel/UCG_Xj6eHBMaW9HTHTya9q6w'
}
global.cooldown = 300000 // 5 menit
//------ JANGAN DIUBAH -----
let fileP = fileURLToPath(import.meta.url)
fs.watchFile(fileP, async () => {
    fs.unwatchFile(fileP)
    console.log(`Update File "${chalk.yellowBright(fileP)}"`)
    import(`${import.meta.url}?update=${Date.now()}`)
})