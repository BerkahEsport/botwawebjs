import axios from "axios"
let handler = async (m, { args, usedPrefix, command }) => {
let [a, b] = m.text.split`|`
let media, reply
// if (m.isMedia) {
//     let fileName = await Func.getRandom(`${m.mime?.split("/")[1]}`)
//     let upload = await UploadFileUgu(await m.downloadMedia(fileName))
     media = { media: { url: thumb } }
//     fs.unlinkSync(`./tmp/${fileName}`)
// }
if (b && m.sender) {
    reply = {
        name: await (await conn.getContactById(m.sender)).pushname,
        text: (b == "q") ? m.body.replace(usedPrefix+command, "") : b,
        chatId: 5,
        id: 5
    }
}
let jsonnya = {
    type: "quoted",
    format: "png",
    backgroundColor: "#1b1e23",
    messages: [
        {
            avatar: true,
            from: {
                id: 8,
                name: b ? await (await conn.getContactById(m.sender)).pushname : await (await conn.getContactById(m.sender)).pushname,
                photo: {
                    url: b ? await conn.getProfilePicUrl(m.sender).catch(() => 'https://i0.wp.com/telegra.ph/file/134ccbbd0dfc434a910ab.png') : await conn.getProfilePicUrl(m.sender).catch(() => 'https://i0.wp.com/telegra.ph/file/134ccbbd0dfc434a910ab.png'),
                }
            },
            ...media,
            text: m.text ? a : m.body.replace(usedPrefix+command, ""),
            replyMessage: { ...reply },
        },
    ],
}
const post = await axios.post("https://bot.lyo.su/quote/generate",
jsonnya,{
    headers: { "Content-Type": "application/json"},
})
let buffer = Buffer.from(post.data.result.image, "base64")
conn.sendMessage(m.from, buffer, { asSticker: true, quoted: m })
}

handler.help = ['quickchat']
handler.tags = ['maker']
handler.command = /^(quickchat|qc)$/i
handler.register = true
export default handler
