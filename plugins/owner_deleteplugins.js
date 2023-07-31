import fs from "fs";
let handler = async (m, { conn, text }) => {
try {
 fs.unlinkSync(`${text}`)
 m.reply(`Plugins ${text} berhasil dihapus!`.trim())   
 } catch {
m.reply('Plugins yang dihapus tidak ada!')
m.reply('$ dir plugins')
}

}
handler.help = ['dp']
handler.tags = ["owner"];
handler.command = /^(dp|delplugin)$/i
handler.owner = true
export default handler