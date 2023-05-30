let handler = async (m, { conn, usedPrefix, command, args, text }) => {
	if (!text) return m.reply(`Masukkan nomornya ${usedPrefix + command} 62895375950107`);
	let user = text.split(',').map(v => (v.replace(/[^0-9]/g, '')).replace(/\D/g, '') + '@c.us')
	let chat = await m.getChat();
	await chat.addParticipants(user).then(() => m.reply(`Berhasil menambahkan ${user}`))
}

handler.help = ['add'].map(v => v + ' [nomor 62]')
handler.tags = ['group']
handler.command = /^(add|\+)$/i

handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler;