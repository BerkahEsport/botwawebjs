let handler = async (m, { text }) => {
    let packname = text.split('|')[0] ? text.split('|')[0] : 'BERKAHESPORT.ID'
    let author = text.split('|')[1] ? text.split('|')[1] : '@moexti'
    let q = m.hasQuotedMsg ? await m.quoted : m
    var isMedia = q.hasMedia && q.type.includes('image') || q.hasMedia && q.type.includes('video') || q.hasMedia && q.type.includes('gif');
    if (isMedia) {
        m.react("⏳");
        var media = await q.downloadMedia();
        if (media) {
            m.react("✅");
            conn.sendMessage(m.from, media, { asSticker: true, quoted: m, packName: packname, packPublish: author })
        } else {
            m.react("⚠️");
            m.reply("Gagal, silahkan hubungi owner..!");
        }   
    }
}

handler.help = ['s [media]', 'sgif [media]']
handler.tags = ['sticker']
handler.command = /^s(tic?ker)?(gif)?$/i
export default handler