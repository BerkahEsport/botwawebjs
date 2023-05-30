let handler = async (m, { conn, usedPrefix, command, args, text }) => {
	if (!text) return m.reply(`Masukkan teks untuk nama GC ini:\n${usedPrefix + command} Group Diskusi Bot`);
	let chat = await m.getChat();
	await chat.setSubject(text).then(() => m.reply(`Berhasil mengubah nama group.`))
}

handler.help = ['setnamagc'].map(v => v + ' [teks]')
handler.tags = ['group']
handler.command = /^(setnamagc)$/i

handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler;