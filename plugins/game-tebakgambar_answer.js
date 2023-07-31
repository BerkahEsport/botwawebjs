import similarity from 'similarity'
const threshold = 0.72
export async function before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBot || !m.text || !/Ketik.*hint/i.test(m.quoted.text) || /.*hint/i.test(m.text))
        return !0
    this.tebakgambar = this.tebakgambar ? this.tebakgambar : {}
    if (m.quoted.id.id == this.tebakgambar[id][0].id.id) {
        let isSurrender = /^(menyerah|nyerah$)/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.tebakgambar[id][3])
            delete this.tebakgambar[id]
            return conn.reply(m.chat, '*ʏᴀʜ, ᴊᴀɴɢᴀɴ ᴍᴜᴅᴀʜ ᴘᴜᴛᴜꜱ ᴀꜱᴀ. ꜱᴇᴍᴀɴɢᴀᴛ!!! :( !*', m)
        }
        let json = JSON.parse(JSON.stringify(this.tebakgambar[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebakgambar[id][2]
            conn.reply(m.chat, `*ʙᴇɴᴀʀ!*\n+${this.tebakgambar[id][2]} XP`, m)
            clearTimeout(this.tebakgambar[id][3])
            delete this.tebakgambar[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
            m.reply(`*ᴅɪᴋɪᴛ ʟᴀɢɪ*`)
        else
            conn.reply(m.chat, `*ꜱᴀʟᴀʜ!*`, m)
    }
    return !0
}
export const exp = 0

