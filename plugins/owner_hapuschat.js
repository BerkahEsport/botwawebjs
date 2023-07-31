let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (/^(semua)$/g.test(args[0])) {
		const chatsArr = await conn.getChats()
		m.reply(`${chatsArr.length} berhasil dihapus!`)
		for (let chats of chatsArr) {
			await chats.clearMessages()
		}
	} else {
		let chat = await m.getChat()
		await chat.clearMessages()
		m.reply('Chats berhasil dihapus!')
	}
}

handler.help = ['hapuschat'].map(v => v + ` [semua]`)
handler.tags = ['owner']
handler.command = /^(clearchat|hapuschat)$/i

handler.owner = true

export default handler;