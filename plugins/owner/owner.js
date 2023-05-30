import fetch from 'node-fetch'
import pkg from 'whatsapp-web.js'
const { MessageMedia } = pkg
let handler = async (m, { conn, text }) => {
  let info= `
*BIODATA OWNER*

*Nama*          : moexti
*Asal*            : Boyolali, Jawa Tengah
*Pendidikan* : _Bukan Sarjana IT hanya Public HaveFUN_
*Status*         : _Awali segalanya dengan *BISMILLAHIRROHMANIRROHIM*._

*SOSIAL MEDIA*

*Instagram*: 
_https://instagram.com/moexti_
*Facebook*: 
_https://m.facebook.com/berkahesport.id_
*Chanel Youtube*:
_https://m.youtube.com/channel/UCG_Xj6eHBMaW9HTHTya9q6w_
*Gmail*: _berkahesport@gmail.com_

_Oke udah itu aja terimakasih_

`.trim()

let gambar = await MessageMedia.fromUrl(thumb)
conn.sendMessage(m.from, gambar, {caption: info})

}
handler.help = ['owner']
handler.tags = ['info']
handler.command = /^(owner)$/i

export default handler