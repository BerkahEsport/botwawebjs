let handler = async (m, { conn, text, isAdmin, isGroup }) => {
    if (!m.hasQuotedm) {
        m.react('⚠️');
        return m.reply('Reply pesan bot untuk menghapus pesan!')
    } else if (m.hasQuotedm) {
        var q = await m.getQuotedMessage();
        if (q.fromMe || isGroup && isAdmin) q.delete(true); 
        else {
            m.react("⚠️");
            return m.reply("Maaf, saya hanya bisa menghapus pesan saya sendiri atau hapus pesan orang lain dalam grup apabila saya admin.")
        }
    }
}

handler.help = ['delete [pesan balasan]']
handler.tags = ['tools']
handler.command = /^del(ete)?$/i

export default handler;