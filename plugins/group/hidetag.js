// JamvanHax0r

let handler = async (m, { conn, text, usedPrefix, command }) => {
	const participants = (await m.getChat()).participants.map(v => v.id._serialized);
	const mentions = await Promise.all(participants.map(jid => conn.getChatById(jid)));
	let teks = m.hasQuotedMsg ? m._data.quotedMsg.body : text
	if (!teks) return m.reply(`Masukkan teks:\n${usedPrefix + command} Halo semuanya...`)
	conn.sendMessage(m.id.remote, teks, { mentions })
}

handler.help = ['hidetag'].map(v => v + ' [teks]')
handler.tags = ['owner']
handler.command = /^(pengumuman|hidetag)$/i

handler.group = true
handler.admin = true

export default handler;