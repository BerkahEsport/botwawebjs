// <----- BERKAHESPORT.ID OFC ----->>
/* Whatsapp bot versi WAWEB ini mohon digunakan dengan bijak
Terimakasih Untuk ALLAH S.W.T.
Serta junjungan kami nabi Muhammad S.A.W

Base dibuat tanggal 28 Mei 2023
Oleh: https://github.com/BerkahEsport/
Collaborator : https://github.com/Leuthra/
-
- Silahkan tambah disini bro...
Jangan ubah yak mending ditambah... ^_^
*/
import pkg from 'chalk';
const { white,yellowBright, blueBright, red, green, blue, yellow, cyan, redBright, magenta, gray, grey } = pkg;
import PhoneNumber from 'awesome-phonenumber';
import fs from 'fs';
import { fileURLToPath } from "node:url";
export default async(conn, m) => {
      let chats = await m.getChat();
      let user = await m.getContact();
      let text = white(m.text)
      if (m.mentionedJid) for (let users of m.mentionedJid) text = text.replace('@' + users.split`@`[0], blueBright("@" + await (await conn.getContactById(users)).pushname))
// Keluaran di terminal (Console.Log)
let print = `┏━━━⬣
│👤 ${red(conn.info.pushname) + " " + green(PhoneNumber("+" + conn.info.wid.user).getNumber("international"))}
│👫 ${gray((user.pushname + " " + PhoneNumber("+" + user.number).getNumber("international")) )}
│🏠 ${blueBright(chats.name) + " " + white(m.from)}
│💾 ${grey(m.type.replace(/^./, (v) => v.toUpperCase()))}
│⏰ ${cyan((m.timestamp ? new Date(1000 * (m.timestamp.low || m.timestamp)) : new Date).toTimeString())}
│♻️  ${white(conn.info.platform.replace(/^./, (v) => v.toUpperCase()))}
│💬 ${m.isCommand ? redBright('COMMAND: ')+yellowBright(m.command) : m.isBot ? blue('Jawaban BOT') : red('Chat Biasa')}
┗━━⬣
${magenta('<========== '+yellow(global.nama.bot)+' ==========>')}
${text}`.trim()
console.log(print)
  }

let fileP = fileURLToPath(import.meta.url)
fs.watchFile(fileP, () => {
fs.unwatchFile(fileP)
console.log(`Update File "${fileP}"`)
import(`${import.meta.url}?update=${Date.now()}`)
})
  
  /*
  Data warna chalk
          "red",
          "green",
          "blue",
          "yellow",
          "magenta",
          "cyan",
          "redBright",
          "greenBright",
          "blueBright",
          "yellowBright",
          "magentaBright",
          "cyanBright"
  */