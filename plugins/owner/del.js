let handler = async (m, { conn, usedPrefix, command }) => {
	if (!m.hasQuotedMsg) return m.reply(`Sebutkan pesanya:\n${usedPrefix + command} [balasan pesan]`);
	let quoted = await m.getQuotedMessage()
	quoted.delete(true)
}

handler.help = ['delete'].map(v => v + ' [pesan]')
handler.tags = ['owner']
handler.command = /^del(ete)?$/i

handler.owner = true

export default handler;