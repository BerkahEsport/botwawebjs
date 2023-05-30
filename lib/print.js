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
const {white ,yellowBright, blueBright, red, green, blue, yellow, cyan, redBright, magenta } = pkg;
import PhoneNumber from 'awesome-phonenumber';
  
  export default async(conn, m) => {
      let chats = await m.getChat();
      let user = await m.getContact();
  
       // Keluaran di terminal (ConsoleLog)
      let text = m.isCommand ? yellowBright(m.body) : m.body
      if (m.mentionedIds) for (let users of m.mentionedIds) text = text.replace('@' + users.split`@`[0], blueBright("@" + await (await conn.getContactById(users)).pushname))
      let print = `┏━━━⬣
│👤 ${red(conn.info.pushname)}
│📱 ${green(PhoneNumber("+" + conn.info.wid.user).getNumber("international"))}
│👫 ${blue((user.pushname + " " + PhoneNumber("+" + user.number).getNumber("international")) )}
│🏠 ${yellow(chats.name + " " + m.from)}
│💾 ${blue(m.type.replace(/^./, (v) => v.toUpperCase()))}
│⏰ ${cyan((m.timestamp ? new Date(1000 * (m.timestamp.low || m.timestamp)) : new Date).toTimeString())}
│♻️  ${redBright(conn.info.platform.replace(/^./, (v) => v.toUpperCase()))}
│💬 ${white(m.isCommand ? yellowBright(m.body) : m.body)}
┗━━⬣`.trim()
      
      console.log(print)
  }

  
  
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