let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
	let [_, code] = text.match(linkRegex) || []
	if (!code) return m.reply(`Masukkan LinkGCnya:\n${usedPrefix + command} https://chat.whatsapp.com/JKdIWr5fj990Ux2oqTjTo5`);
	await conn.acceptInvite(code)
}

handler.help = ['join'].map(v => v + ` [linkgc]`)
handler.tags = ['owner']
handler.command = /^(join)$/i

handler.owner = true

export default handler;