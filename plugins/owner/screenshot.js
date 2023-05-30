import { fileTypeFromBuffer } from 'file-type';
import wweb from 'whatsapp-web.js';
const { MessageMedia } = wweb

let handler = async (m, { conn }) => {
    await conn.pupPage.setViewport({ width: 720, height: 1600})
    let media = await conn.pupPage.screenshot({fullPage: true})
    m.reply(new MessageMedia((await fileTypeFromBuffer(media)).mime, media.toString("base64")))
}

handler.help = ['sswa']
handler.tags = ['owner']
handler.command = /^(screenshot|ss)wa$/i

handler.owner = true

export default handler;

// Sudah fix ganti module file-type (diturunin versinya)