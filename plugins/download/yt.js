import fetch from 'node-fetch'
import { MessageMedia} from 'whatsapp-web.js'
import { youtube } from '@xct007/frieren-scraper'
import { fileTypeFromBuffer } from 'file-type'
let handler = async (m, { args, usedPrefix, command  }) => {
    if (!args || !args[0]) return m.reply(`Input URL:\n${usedPrefix + command} https://youtu.be/jySbH-dLrYA`);
    const data = await youtube.download(args[0])
    if (data.error) return m.reply(`${data.message}`);
    const { thumbnail, urls: _urls, title } = data
    let urls, source, lastError
    for (let i in _urls) {
      try {
        urls = _urls[i];
        source = Buffer.from(await (await fetch(urls.url)).arrayBuffer())
        if (Buffer.isBuffer(source)) break;
      } catch (e) {
        urls = source = null;
        lastError = e;
      }
    }
    if (!(Buffer.isBuffer(source))) return m.reply('_ᴛɪᴅᴀᴋ ᴅᴀᴘᴀᴛ ᴍᴇɴɢᴜɴᴅᴜʜ ᴠɪᴅᴇᴏ..._');
    m.reply(new MessageMedia((await fileTypeFromBuffer(source)).mime, source.toString("base64")));
  }
    handler.help = ['yt']
    handler.tags = ['downloader']
    handler.command = /^(yt|youtube)$/i
    handler.register = true
    export default handler