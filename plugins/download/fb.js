import fetch from 'node-fetch' //Buat ngambil link gambar...
import { MessageMedia} from 'whatsapp-web.js' // Untuk BOT
import { facebook } from '@xct007/frieren-scraper'
import { fileTypeFromBuffer } from 'file-type'
let handler = async (m, { args, usedPrefix, command }) => {
	if (!args || !args[0]) return m.reply(`Input URL:\n${usedPrefix + command} https://fb.watch/jL5pC4D874`);
	const data = await facebook.v1(args[0])
	if (data.error) return m.reply(`${data.message}`);
	const res = await fetch(data.isHdAvailable ? data.urls[0].hd : data.urls[1].sd)
	const buff = Buffer.from(await res.arrayBuffer())
	await m.reply(new MessageMedia((await fileTypeFromBuffer(buff)).mime, buff.toString("base64")))
}
    handler.help = ['fb']
    handler.tags = ['downloader']
    handler.command = /^(fb|facebook)$/i
    handler.register = true
    export default handler