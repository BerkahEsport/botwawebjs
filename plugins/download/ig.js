import fetch from 'node-fetch'
import pkg from 'whatsapp-web.js'
const { MessageMedia} = pkg 
import { instagram } from '@xct007/frieren-scraper'
import { fileTypeFromBuffer } from 'file-type'
let handler = async (m, { args, usedPrefix, command }) => {
    if (!args || !args[0]) return m.reply(`Input URL:\n${usedPrefix + command} https://www.instagram.com/p/Cp9u9aou7lK`);
    const data = await instagram.v1(args[0])
    if (data.error) return m.reply(`${data.message}`);
    for (let url of data) {
      const res = await fetch(url.url)
      const buff = Buffer.from(await res.arrayBuffer())
      await m.reply(new MessageMedia((await fileTypeFromBuffer(buff)).mime, buff.toString("base64")))
    }
  }
    handler.help = ['ig']
    handler.tags = ['downloader']
    handler.command = /^(ig|instagram)$/i
    handler.register = true
    export default handler