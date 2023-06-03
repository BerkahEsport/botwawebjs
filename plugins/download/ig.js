import { instagram } from '@xct007/frieren-scraper'
let handler = async (m, { args, usedPrefix, command }) => {
    if (!args || !args[0]) return m.reply(`Input URL:\n${usedPrefix + command} https://www.instagram.com/p/Cp9u9aou7lK`);
    const data = await instagram.v1(args[0])
    if (data.error) return m.reply(`${data.message}`);
    for (let url of data) {
      await conn.sendMessage(m.chat, url.url, {caption: ty})
    }
  }
    handler.help = ['ig']
    handler.tags = ['downloader']
    handler.command = /^(ig|instagram)$/i
    handler.register = true
    export default handler