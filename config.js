import chalk from 'chalk'
import fs from 'fs';
import path from 'path'
import { platform } from 'process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createRequire } from 'module' // Bring in the ability to create the 'require' method
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') { return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString() }; global.__dirname = function dirname(pathURL) { return path.dirname(global.__filename(pathURL, true)) }; global.__require = function require(dir = import.meta.url) { return createRequire(dir) }
global.__dirname = global.__dirname(import.meta.url)
/*============== WATERMARK ==============*/
global.wm =  '⫹⫺ ★彡[ʙᴇʀᴋᴀᴇꜱᴘᴏʀᴛ.ɪᴅ]彡★'//Ganti ae ini buat Main Watermark
global.wm2 = '🅱🅴🆁🅺🅰🅴🆂🅿🅾🆁🆃.🅸🅳'
global.wm3 = '                「 ꧁༒☬𝓑𝓔𝓡𝓚𝓐𝓔𝓢𝓟𝓞𝓡𝓣.𝓘𝓓☬༒꧂ 」'
global.author = '                「 *@爪ㄖ乇乂ㄒ丨* 」'

/*============== PERINGATAN ==============*/
global.nsfw = 'Fitur NSFW Dimatikan\nKetik *!enable* *nsfw* untuk menggunakan fitur ini!\n“Katakanlah kepada orang laki-laki yang beriman: Hendaklah mereka menahan pandanganya, dan memelihara kemaluannya; … Katakanlah kepada wanita yang beriman: Hendaklah mereka menahan pandangannya, dan kemaluannya, dan janganlah mereka Menampakkan perhiasannya, kecuali yang (biasa) nampak dari padany,” \n(TQS. Al-Nur [24]: 30-31).'
global.subs = 'Jangan liat doang, subscribe dulu dong.. \n https://m.youtube.com/channel/UCG_Xj6eHBMaW9HTHTya9q6w'
global.ty = '💭 ɪɴɪ ʜᴀꜱɪʟɴʏᴀ... \nᴊᴀɴɢᴀɴ ʟᴜᴘᴀ ꜱᴜᴘᴘᴏʀᴛ ɪɢ @ʙᴇʀᴋᴀʜᴇꜱᴘᴏʀᴛ.ɪᴅ ʏᴀᴋ...  \n👍 ᴛʜᴀɴᴋꜱ ʏᴏᴜ... ^_^'

/*============== LOGO ==============*/
global.thumb = 'https://telegra.ph/file/47b3652155f158b931bda.jpg' //Main Thumbnail
global.imagebot = 'https://raw.githubusercontent.com/BerkahEsport/api-be/main/tmp/gmbr/logo2.png' //Logo BE
global.akses_ditolak = 'https://raw.githubusercontent.com/BerkahEsport/api-be/main/src/access_ditolak.jpg' // Gambar ketika akses dibatasi
/*============== TEXT ==============*/
global.wait = '```「▰▰▰▰▱▱▱▱▱▱」Loading...```'
global.waits = ['```「▰▱▱▱▱▱▱▱▱▱」Loading...```','```「▰▰▱▱▱▱▱▱▱▱」Loading...```','```「▰▰▰▱▱▱▱▱▱▱」Loading...```','```「▰▰▰▰▱▱▱▱▱▱」Loading...```','```「▰▰▰▰▰▱▱▱▱▱」Loading...```']
global.eror = '```404 error```'

/*============== GROUPS ==============*/
global.gcofc = 'https://chat.whatsapp.com/JKdIWr5fj990Ux2oqTjTo5' // GC resmi BERKAHESPORT.ID OFC
global.rpg = 'https://chat.whatsapp.com/CxIlUZlW3lD7eH4LLLWYoZ' // GC untuk main Game RPG
global.rpg2 = 'https://chat.whatsapp.com/C4Qax9BYH9Q2DbFeRQRmRD' // GC untuk main Game RPG 2

/*============== DATA ==============*/
global.owner = [
    // [nomor kamu, nama kamu, developer bukan?]
    ["62895375950107", "berkahesport", true],
    ["628953751549895", "moexti", true],
]

global.sticker = {
  packname: "BerkahEsport.ID", // Isi aja terserah.
  author: "@moexti" //Isi aja nama kamu.
}

global.prefix = '.'
// <----- Pake REST API ----->

/*============== SITUS REST API ==============*/

global.RestAPI = {
  xnzsenpai: { 
  facebook: 'https://xzn.wtf/api/download?url=',
  instagram: 'https://xzn.wtf/api/igdl?url=',
  twitter: 'https://xzn.wtf/api/twitterdl?url=',
  youtube: 'https://xzn.wtf/api/y2mate?url=',
  tiktok: 'https://xzn.wtf/api/tiktok?url='

}

  //Tambahin kalo punya RestAPI.
}

/*============== JANGAN DIUBAH ==============*/
let fileP = fileURLToPath(import.meta.url)
fs.watchFile(fileP, async () => {
    fs.unwatchFile(fileP)
    console.log(`Update File "${chalk.yellowBright(fileP)}"`)
    import(`${import.meta.url}?update=${Date.now()}`)
})
// <----- BERKAHESPORT.ID OFC ----->>
/* Whatsapp bot versi WAWEB ini mohon digunakan dengan bijak
Terimakasih Untuk ALLAH S.W.T.
Serta junjungan kami nabi Muhammad S.A.W

Base created by @moexti 08 Mei 2023
- Silahkan tambah disini bro...
-
-

Jangan ubah yak mending ditambah... ^_^
*/