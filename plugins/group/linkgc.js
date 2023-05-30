let handler = async (m, { conn, usedPrefix, command, args, text }) => {
	let chat = await m.getChat();
	m.reply('https://chat.whatsapp.com/' + await chat.getInviteCode())
}

handler.help = ['linkgc']
handler.tags = ['group']
handler.command = /^(linkgc)$/i

handler.group = true
handler.botAdmin = true

export default handler;