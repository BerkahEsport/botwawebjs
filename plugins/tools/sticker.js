let handler = async (m, { text }) => {
    let packname = text.split('|')[0] ? text.split('|')[0] : global.sticker.packname
    let author = text.split('|')[1] ? text.split('|')[1] : global.sticker.author
    let q = m.hasQuotedm ? await m.getQuotedMessage() : m
    var isMedia = q.hasMedia && q.type.includes('image') || q.hasMedia && q.type.includes('video') || q.hasMedia && q.type.includes('gif');
    if (isMedia) {
        m.react("⏳");
        var media = await q.downloadMedia();
        if (media) {
            m.react("✅");
            await m.reply(media, undefined, { sendMediaAsSticker: true, stickerName: packname, stickerAuthor: author });
        } else {
            m.react("⚠️");
            m.reply("Gagal, silahkan hubungi owner..!");
        }   
    }
}

handler.help = ['stiker [media]', 'stikergif [media]']
handler.tags = ['tools']
handler.command = /^s(tic?ker)?(gif)?$/i
export default handler