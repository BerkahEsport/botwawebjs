import fetch from 'node-fetch'
let handler = async (m, { text, usedPrefix, command }) => {
    const code = m.hasQuotedMsg ? m.quoted.text : text
    if (!code) return m.reply(`Input Code:\n${usedPrefix + command} console.log('BerkahEsport.ID')`);
    let carbon = await generateCarbon(code)
    if (carbon.status !== 200) return m.reply(`${carbon.status} ${carbon.statusText}`);
    conn.sendMessage(m.chat, carbon.result, {caption: ty})
}
    handler.help = ['carbon']
    handler.tags = ['maker']
    handler.command = /^(carbon)$/i
    handler.register = true
    export default handler

    async function generateCarbon(options) {
        const res = await fetch('https://carbonara.solopov.dev/api/cook', { method: 'post', body: JSON.stringify({ code: options }), headers: {'Content-Type': 'application/json'} })
        if (res.status !== 200) return {
            status: res.status,
            statusText: res.statusText
        }
        const buff = Buffer.from(await res.arrayBuffer())
        return {
            status: res.status,
            statusText: res.statusText,
            result: buff
        }
    }