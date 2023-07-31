import fs from "fs"
import { exec } from "child_process"
import { webp2mp4File } from "../lib/converter.js"
import Func from "../lib/func.js"
let handler = async (m, { conn, usedPrefix, command }) => {
    if(!m.hasQuotedMsg) return m.reply(`Balas stiker dan ketikan command:\n${usedPrefix + command}`)
    if (m.quoted.isAnimated) {
        let download = await m.quoted.downloadMedia()
        let media = await webp2mp4File(download)
        conn.sendMessage(m.from, media, { quoted: m })
    } else {
        let webp = await m.quoted.downloadMedia(await Func.getRandom('webp'))
        let png = `./tmp/${await Func.getRandom('png')}`
        exec(`ffmpeg -i ${webp} ${png}`, async(err) => {
            fs.unlinkSync(webp)
            if (err) return m.reply(Func.Format(err))
            let buffer = fs.readFileSync(png)
            await conn.sendMessage(m.from, buffer, { quoted: m })
            fs.unlinkSync(png)
        })
    }

}

handler.help = ["toimg"].map((v) => v + " [stiker]");
handler.tags = ["sticker"];
handler.command = /^to(img|image)$/i;

export default handler;