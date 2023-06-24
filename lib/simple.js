import { Client as _Client } from "whatsapp-web.js"
import fs from 'fs';
import {fileTypeFromBuffer} from "file-type"
import { fileURLToPath } from "node:url"
import path from 'node:path'
import func from "./func.js"
import { extension } from "mime-types"
import {MessageMedia} from 'whatsapp-web.js'
import fetch from "node-fetch";

const __dirname = path.dirname(fileURLToPath(import.meta.url))

class client extends _Client {
            /**
             * Membuffer file.
             * @param {fs.PathLike} PATH 
             * @param {Boolean} saveToFile
             */
    async getFile(PATH, saveToFile = false) {
        let filename;
        const res = await fetch(PATH)
        //if (!Buffer.isBuffer(res)) throw new TypeError('Result is not a buffer')
        const buff = Buffer.from(await res.arrayBuffer())
         const type = await fileTypeFromBuffer(buff) || {
            mime: 'application/octet-stream',
            ext: '.bin'
        }
        if (res && saveToFile && !filename) (filename = path.join(__dirname, '../tmp/' + new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, buff))
        return {
            filename,
            deleteFile() {
                return filename && fs.promises.unlink(filename)
            }
        }
    }
      
            /**
             * Mengirim Video / Gambar dari JSON
             * @param {String} jid
             * @param {String|Buffer} link
             * @param {String} caption
             * @param {Object} options
             */
    async sendFile(jid, link, namefile = '', caption = '', options = {}) {
        //let type = await conn.getFile(link, true)
        //let {filename } = type
       let m;
        try {
            m = await conn.sendMessage(jid, link, { caption: caption, ...options });
        } catch (e) {
            console.error(e)
            m = null
        } finally {
            if (!m) m = await conn.sendMessage(jid,  link, { caption: caption, ...options });
            return m //,
            // fs.unlink(filename, err => {
            //     if (err) throw console.log(err);
            //   });

        }
    }


                    /**
             * Mengirim teks
             * @param {String} jid
             * @param {String} teks
             * @param {Object} quoted
             */
    async reply(jid , teks, quoted = {}) {
        let m;
        try {
            m = conn.sendMessage(jid, teks, quoted);
        } catch (e) {
            m = conn.sendMessage(jid, `${e}`);
        }
    }

            /**
             * Mengirim AdReply
             * @param {String} jid
             * @param {String|Buffer} link
             * @param {String} caption
             * @param {Object} options
             */
    async sendAd(jid, link = '', caption = '', options = {}) {

        conn.sendMessage(jid , link, {...options,
                caption: caption,
                quoted: options.quoted,
                mentions: options.sender ? options.sender : '62895375950107@c.us',
                extra: {
                    ctwaContext: {
                        title: conn.info.pushname,
                        sourceUrl: 'https://instagram.com/berkahesport.id',
                        thumbnailUrl: 'https://telegra.ph/file/47b3652155f158b931bda.jpg',
                        description: `BOTWAWEBJS`,
                        linkPreview: true
                    }
                }
            })  
}
	
            /**
             * Mengirim hasil dari JSON menjadi teks)
             * @param {String} jid
             * @param {String} link
             */
  async json(jid ,link) {
    let data = await (await fetch(link)).json()
    let json = JSON.stringify(data)
    let m;
    try {
        m = conn.sendMessage(jid, `${json}`);
    } catch (e) {
        m = conn.sendMessage(jid, `${e}`);
    }
}


// Jangan dihapus / diedit nanti error. @moexti
    constructor(...args) {
        super(...args)
    }

    /**
     * Mengunduh dan dikembalikan menjadi media.
     * @returns {Promise<MessageMedia>}
     */
    async downloadMediaMessage(msg) {
        if (!Boolean(msg.mediaKey && msg.directPath)) throw new Error('Not Media Message')

        const result = await this.mPage.evaluate(async ({ directPath, encFilehash, filehash, mediaKey, type, mediaKeyTimestamp, mimetype, filename, size, _serialized }) => {
            try {
                const decryptedMedia = await (window.Store.DownloadManager?.downloadAndMaybeDecrypt || window.Store.DownloadManager?.downloadAndDecrypt)({
                    directPath,
                    encFilehash,
                    filehash,
                    mediaKey,
                    mediaKeyTimestamp,
                    type: (type === 'chat') ? (mimetype.split('/')[0] || type) : type,
                    signal: (new AbortController).signal
                });

                const data = await window.WWebJS.arrayBufferToBase64(decryptedMedia);

                return {
                    data,
                    mimetype: mimetype,
                    filename: filename,
                    filesize: size
                };
            } catch (e) {
                const blob = await window.WWebJS.chat.downloadMedia(_serialized)
                return {
                    data: await window.WWebJS.util.blobToBase64(blob),
                    mimetype: mimetype,
                    filename: filename,
                    filesize: size
                }
            }
        }, { directPath: msg.directPath, encFilehash: msg.encFilehash, filehash: msg.filehash, mediaKey: msg.mediaKey, type: msg.type, mediaKeyTimestamp: msg.mediaKeyTimestamp, mimetype: msg.mime, filename: msg.filename, size: msg.fileSize, _serialized: msg.id._serialized })

        if (!result) return undefined;
        return func.base64ToBuffer(result?.data)
    }

    /**
     * 
     * @param {*} message 
     * @param {*} filename 
     * @returns 
     */
    async downloadAndSaveMediaMessage(message, filename) {
        if (!message.isMedia) return

        filename = filename ? filename : func.getRandom(extension(message?.mime || message._data.mimetype || message.mimetype))
        const buffer = await this.downloadMediaMessage(message)
        const filePath = path.join(__dirname, '../tmp/', filename)
        await fs.promises.writeFile(filePath, buffer)

        return filePath
    }


    /**
     * 
     * @param {*} msgId 
     * @returns 
     */
    async loadMessage(message) {
        const msg = await this.playPage.evaluate(async messageId => {
            let msg = window.Store.Msg.get(messageId);
            if (msg) return window.WWebJS.getMessageModel(msg);

            const params = messageId.split('_');
            if (params.length !== 3) throw new Error('Invalid serialized message id specified');

            const [fromMe, chatId, id] = params;
            const chatWid = window.Store.WidFactory.createWid(chatId);
            const fullMsgId = {
                fromMe: Boolean(fromMe),
                remote: chatWid,
                id,
            };

            const msgKey = new window.Store.MsgKey(fullMsgId);
            const chat = await window.Store.Chat.find(msgKey.remote);
            const ctx = await chat.getSearchContext(msgKey);
            if (ctx.collection && ctx.collection.loadAroundPromise) {
                await ctx.collection.loadAroundPromise;
            }

            msg = window.Store.Msg.get(messageId);
            if (msg) return window.WWebJS.getMessageModel(msg);
        }, message?._serialized ? message._serialized : message);

        if (msg) {
            let messages = new Message(this, msg);
            return await (await smsg(this, messages));
        }
        return null;
    }



}


// Ambil dan diperbaiki lagi agar tidak error dari mywajs.
const smsg = async (conn, m) => {
    if (conn.info) {
        conn.user = {
        id : conn.info.me.user || conn.info.wid.user,
        jid: conn.info.me._serialized || conn.info.wid._serialized,
        pushname: conn.info.pushname
    }}
    
    if (!m) return
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
    m.isGroup = m.from.endsWith('g.us') || false
    m.isOwner = [...global.owner.map(([number]) => number)].map((v) => v?.replace(/[^0-9]/g, "")).includes(((m.sender).split("@")[0]));
    m.pushName = m._data.notifyName
    m.isBot = (m.id?.id?.startsWith("3EB0")) || (m.id?.id?.startsWith("BAE5")) || false
    if (conn.info) m.botNumber = conn.info.me._serialized || conn.info.wid._serialized
    m.mentionedJid = (Array.isArray(m._data.mentionedJidList) && m._data.mentionedJidList.length !== 0) ? m._data.mentionedJidList.map(a => a._serialized) : [],
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
        m.metadata = await (await conn.groupMetadata(m.from))
        m.groupAdmins = m.metadata.participants.filter((a) => (a.isAdmin || a.isSuperAdmin))
        m.isAdmin = !!m.groupAdmins.find((member) => ((typeof member.id === 'object' && member.id !== undefined) ? member.id._serialized : member.id) === m.sender)
        m.isBotAdmin = !!m.groupAdmins.find((member) => ((typeof member.id === 'object' && member.id !== undefined) ? member.id._serialized : member.id) === m.botNumber)
    }

    m.body = m?.selectedButtonId || m?.selectedRowId || m?._data?.caption || m?._data?.body || m?.body || ''
    m.arg = m?.body?.trim()?.split(/ +/) || []
    m.args = m?.body?.trim()?.split(/ +/)?.slice(1) || []
    m.text = m?.args?.join(" ")

    // Untuk kustom pesan.
    if (m.isMedia) m.downloadMedia = (filePath) => {
        if (filePath) return conn.downloadAndSaveMediaMessage(m, filePath)
        else return conn.downloadMediaMessage(m)
    }
    m.resend = () => conn.forwardMessage(m.from, m._serialized)
    m.reply = (content, options = {}) => conn.sendMessage(options.from ? options.from : m.from, content, { quoted: m, ...options })
    m.error = (owner, content, options = {}) => conn.sendMessage(owner, content, { quoted: m, ...options })
    if (!m.author) delete m.author
    if (!m.isStatus) delete m.isStatus
    if (!m.isForwarded) delete m.isForwarded
    if (m.forwardingScore === 0) delete m.forwardingScore
    if (m.vCards.length === 0) delete m.vCards
    if (!m.inviteV4) delete m.inviteV4
    if (!m.orderId) delete m.orderId
    if (!m.token) delete m.token
    if (!m.hasMedia) {
        delete m.duration
        delete m.isGif
    }
    if (!m.isEphemeral) {
        delete m.isEphemeral
        delete m.ephemeralDuration
    }

    delete m._data
    delete m.mentionedIds
    delete m.location

    if (m.hasQuotedMsg) {
        let data = await m.getQuotedMessage() || {}
        m.quoted = await (await smsg(conn, data))

        delete data._data
    }

    return await (await m)
}





export { client, smsg }