import { facebook } from '@xct007/frieren-scraper'
let handler = async (m, { args, usedPrefix, command }) => {
	if (!args || !args[0]) return m.reply(`Input URL:\n${usedPrefix + command} https://www.facebook.com/reel/615130143911796`);
	const data = await facebook.v1(args[0])
	if (data.error) return m.reply(`${data.message}`);
	const res = data.isHdAvailable ? data.urls[0].hd : data.urls[1].sd
	await conn.sendMessage(m.from, res, {quoted: m })
}
    handler.help = ['fb']
    handler.tags = ['downloader']
    handler.command = /^(fb|facebook)$/i
    handler.register = true
    export default handler
