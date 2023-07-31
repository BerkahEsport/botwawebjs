import fs from "fs";
let handler = async (m, { conn, text }) => {
try {
 let data = await fs.readFileSync(`./plugins/${text}`).toString()
 m.reply(`${data}`.trim())   
 } catch {
m.reply('Plugins yang dicari tidak ada!')
m.reply('$ dir plugins')
}

}
handler.help = ['gp']
handler.tags = ["owner"];
handler.command = /^(gp|plugins)$/i
handler.owner = true
export default handler