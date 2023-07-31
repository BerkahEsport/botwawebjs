let handler = async (m, { conn, text, isAdmin, isGroup }) => {
    if (!m.hasQuotedMsg) {
        m.react('⚠️');
        return m.reply('Balas pesan untuk menghapus pesan!')
    } else if (m.hasQuotedMsg) {
        let quoted = await m.getQuotedMessage()
	quoted.delete(true)
    m.react("✅");
        if (quoted.fromMe || isGroup && isAdmin) quoted.delete(true); 
        else {
            m.react("⚠️");
            return m.reply("Maaf, saya hanya bisa menghapus pesan saya sendiri atau hapus pesan orang lain dalam grup apabila saya admin.")
        }
    }
}

handler.help = ['del [balasan pesan]']
handler.tags = ['tools']
handler.command = /^(del)$/i

export default handler;