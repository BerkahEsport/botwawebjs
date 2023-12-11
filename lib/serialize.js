import func from "./func.js";
import fs from "fs";
export default async function smsg(conn, m) {
// Ambil dan diperbaiki lagi agar tidak error dari mywajs.
if (conn.info) {
    conn.user = {
    id : conn.info.me.user || conn.info.wid.user,
    jid: conn.info.me._serialized || conn.info.wid._serialized,
    pushname: conn.info.pushname
}}
if (!m) return m

if (m?._data?.id) {
    m.id = {
        remote: m._data.id.remote || m._data.to,
        participant: (typeof (m._data.author) === 'object' && m._data.author !== null) ? m._data.author._serialized : m._data.author,
        fromMe: m._data.id.fromMe,
        id: m._data.id.id,
        _serialized: m._data.id._serialized
    }
}

m.github = `https://github.com/BerkahEsport/botwawebjs` // BY: berkahesport (owner) & leuthra (collab)
m.from = m.id.remote
m.sender = m.id.participant || m._data.from._serialized || m._data.from || m.from
m.chat = m.from.endsWith('g.us') ? m.from : m.sender
m.text = m?.selectedButtonId || m?.selectedRowId || m?._data?.caption || m?._data?.body || m?.body || ''
m.isGroup = m.from.endsWith('g.us') || false
m.pushname = m._data.notifyName
m.mybot = (m.id?.id?.startsWith("3EB0")) || (m.id?.id?.startsWith("BAE5")) || false
if (conn.info) m.botNumber = conn.info.me._serialized || conn.info.wid._serialized
m.mentions = (Array.isArray(m._data.mentionedJidList) && m._data.mentionedJidList.length !== 0) ? m._data.mentionedJidList.map(a => a._serialized) : [],
m._serialized = m.id._serialized
m.isMedia = m.hasMedia
m.isNewMsg = m._data.isNewMsg
m.ephemeralDuration = m._data.ephemeralDuration || 0

if (m.isMedia) {
    m.deprecatedMms3Url = m._data.deprecatedMms3Url
    m.directPath = m._data.directPath
    m.mime = m._data.mimetype
    m.filehash = m._data.filehash
    m.encFilehash = m._data.encFilehash
    m.mediaKey = m._data.mediaKey || false
    m.width = m._data.width
    m.height = m._data.height
    if (m._data.mediaKeyTimestamp) m.mediaKeyTimestamp = m._data.mediaKeyTimestamp
    if (m._data.size) m.fileSize = m._data.size
    if (m._data.isViewOnce) {
        m.isViewOnce = m._data.isViewOnce
        m.caption = m._data.caption || ''
    }
    if (m._data.wavefrom) m.wavefrom = m._data.wavefrom
    if (m._data.thumbnailWidth) m.thumbnailWidth = m._data.thumbnailWidth
    if (m._data.thumbnailHeight) m.thumbnailHeight = m._data.thumbnailHeight
    if (m._data.isAnimated) m.isAnimated = m._data.isAnimated
}

if (m.isGroup) {
    m.metadata = await conn.groupMetadata(m.from)
    m.groupAdmins = m.metadata.participants.filter((a) => (a.isAdmin || a.isSuperAdmin))
    m.isAdmin = !!m.groupAdmins.find((member) => ((typeof member.id === 'object' && member.id !== undefined) ? member.id._serialized : member.id) === m.sender)
    m.isBotAdmin = !!m.groupAdmins.find((member) => ((typeof member.id === 'object' && member.id !== undefined) ? member.id._serialized : member.id) === m.botNumber)
}
// Untuk kustom pesan.
if (m.isMedia) m.downloadMedia = (filePath) => {
    if (filePath) return conn.downloadAndSaveMediaMessage(m, filePath)
    else return conn.downloadMediaMessage(m)
}
m.reply = async (text = "", options = {}) => {
        let caption = options?.caption ? options.caption : ""
        let chatId = options?.from ? options.from : m.from
        let quoted = options?.quoted ? options.quoted : m
        let fileName = options?.fileName ? options.fileName : m?.pushname ? m.pushname : `BOTBE_${+new Date()}`
        if ((Buffer.isBuffer(text) || /^data:.?\/.*?;base64,/i.test(text) || /^https?:\/\//.test(text) || fs.existsSync(text))) {
             if (!options.mimetype && (/utf-8|json/i.test(text.mime) || text.ext == ".bin" || !text.ext)) {
                return conn.reply(chatId, text, quoted, { mentions: [chatId], ...options })
             } else {
                return conn.sendFile(m.from, text, fileName, caption, quoted, { ...options })
            }
          } else if (typeof text == 'object') {
            return conn.sendMessage(chatId, func.format(text), { mentions: conn.parseMention(func.Format(text)), quoted, ...options });
          } else {
             return conn.sendMessage(chatId, text, { mentions: conn.parseMention(text), quoted, ...options });
          }
       }
    //conn.sendMessage(options.from ? options.from : m.from, content, { quoted: m, ...options })
m.report = (content, options = {}) => conn.sendMessage(global.nomor.ownerid, content, { quoted: m, ...options })
m.resend = () => conn.forwardMessage(m.from, m._serialized)

if (m.hasQuotedMsg) {
    let data = await m.getQuotedMessage() || {}
    m.quoted = await (await smsg(conn, data))
}
return await (await m)
}