import { MessageMedia} from 'whatsapp-web.js';

let handler = async (m, { text, usedPrefix, command }) => {
    let quotedMsg = await m.getQuotedMessage()
    if (quotedMsg && quotedMsg.hasMedia && quotedMsg.type == 'sticker') {
        let attachmentData = await quotedMsg.downloadMedia();
        await m.reply( new MessageMedia(attachmentData.mimetype, attachmentData.data, attachmentData.filename))
    } else return m.reply(`Balas stiker dan ketikan command:\n${usedPrefix + command}`)
}

handler.help = ["toimage"].map((v) => v + " [stiker]");
handler.tags = ["tools"];
handler.command = /^to(img|image)$/i;

export default handler;