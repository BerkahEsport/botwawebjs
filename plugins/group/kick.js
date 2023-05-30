let handler = async (m, { conn, usedPrefix, command, args, text }) => {
	let user = m._data.mentionedJidList
	if (m.hasQuotedMsg) await user.push((await m.getQuotedMessage()).author)
	if (user.length === 0) return m.reply(`Sebutkan orangnya ${usedPrefix + command} @user`);
	let chat = await m.getChat();
	await chat.removeParticipants(user).then(() => m.reply(`Berhasil mengeluarkan member.`))
}

handler.help = ['kick'].map(v => v + ' [@tag]')
handler.tags = ['group']
handler.command = /^(kick|-)$/i

handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler;