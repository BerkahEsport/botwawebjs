let handler = async (m, { conn, usedPrefix, command }) => {
	let quotedMsg = await m.getQuotedMessage() || m;
	if (quotedMsg && quotedMsg.hasMedia) {
		const chat = await m.getChat()
		let attachmentData = await quotedMsg.downloadMedia();
		await chat.setPicture(attachmentData).then(() => m.reply(`Berhasil mengganti gambar group.`))
	} else return m.reply(`Sertakan gambar dan beri command ${usedPrefix + command}`)
}

handler.help = ['setppgc'].map(v => v + ' [media]')
handler.tags = ['group']
handler.command = /^setppgc$/i

handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler;