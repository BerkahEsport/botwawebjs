let handler = async (m, { conn }) => {
    await conn.mPage.setViewportSize({ width:961, height: 2000 })
    let media = await conn.mPage.screenshot()
    await conn.sendMessage(m.from, media, { quoted: m })
}

handler.help = ['sswa']
handler.tags = ['owner']
handler.command = /^(screenshot|ss)wa$/i

handler.owner = true

export default handler;