let handler = async (m, { conn, usedPrefix, command, args, text }) => {
	let resend = /^(yes)$/g.test(args[0])
	let chat = await m.getChat();
	await chat.revokeInvite()
	if (resend) m.reply('https://chat.whatsapp.com/' + await chat.getInviteCode())
}

handler.help = ['revoke'].map(v => v + ' [yes]')
handler.tags = ['group']
handler.command = /^(revoke)$/i

handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler;