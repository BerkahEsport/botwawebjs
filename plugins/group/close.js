let handler = async (m, { conn, usedPrefix, command, args, text }) => {
	let chat = await m.getChat();
	//if (chat.groupMetadata.announce) return await chat.setMessagesAdminsOnly(false)
	await chat.setMessagesAdminsOnly(true).then(() => m.reply(`Group berhasil ditutup.`))
}

handler.help = ['closegc']
handler.tags = ['group']
handler.command = /^closegc$/i

handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler;