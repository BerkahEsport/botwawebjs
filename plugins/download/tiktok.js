import fetch from 'node-fetch'
import pkg from 'whatsapp-web.js'
const { MessageMedia} = pkg 
import { tiktok } from '@xct007/frieren-scraper'
import { fileTypeFromBuffer } from 'file-type'
let handler = async (m, { args, usedPrefix, command }) => {
    if (!args || !args[0]) return m.reply(`Input URL:\n${usedPrefix + command} https://www.tiktok.com/@0kaydxraa/video/7095227114454027521?is_from_webapp=1&sender_device=pc&web_id=7233847008485328386`);
    const data = await tiktok.v1(args[0])
    if (data.error) return m.reply(`${data.message}`);
    const buffVideo = Buffer.from(await (await fetch(data.play)).arrayBuffer())
    const buffAudio = Buffer.from(await (await fetch(data.music)).arrayBuffer())
    await m.reply(new MessageMedia((await fileTypeFromBuffer(buffVideo)).mime, buffVideo.toString("base64")), false, { caption: `*${data.nickname}*\n@${data.unique_id}`.trim() });
    m.reply( new MessageMedia((await fileTypeFromBuffer(buffAudio)).mime, buffAudio.toString("base64")));
}
    handler.help = ['tiktok']
    handler.tags = ['downloader']
    handler.command = /^(tiktok|tt)$/i
    handler.register = true
    export default handler