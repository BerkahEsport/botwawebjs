let handler = async (m, { conn, text }) => {
    if (!m.hasQuotedMsg) return m.reply("Balas pesan viewonce!")
    let q = await m.quoted
    if (q.hasMedia && q.isViewOnce) {
        m.react("⏳");
        let media = await q.downloadMedia();
        if (media) {
            m.react("✅");
            return m.reply(media);
        } else {
            m.react("⚠️");
            return m.reply("Gagal, silahkan coba lagi!");
        }
    } else return m.reply("This is not a view-once message!");
};

handler.help = ['rvo [balasan pesan]'];
handler.tags = ['tools'];

handler.command = /^(readviewonce|rvo)$/i

export default handler;