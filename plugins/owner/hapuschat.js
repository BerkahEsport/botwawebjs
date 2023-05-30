let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (/^(semua)$/g.test(args[0])) {
		const chatsArr = await conn.getChats()
		for (let chats of chatsArr) {
			await chats.clearMessages()
		}
	} else {
		await (await m.getChat()).clearMessages()
	}
}

handler.help = ['hapuschat'].map(v => v + ` [semua]`)
handler.tags = ['owner']
handler.command = /^clearchats?$/i

handler.owner = true

export default handler;