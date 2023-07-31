import { Client as _Client } from "whatsapp-web.js"
//import { Message, MessageMedia, Contact, Location, Buttons, List } from 'whatsapp-web.js/src/structures/index.js'
import Util from "whatsapp-web.js/src/util/Util.js"
import fs from 'fs';
import {fileTypeFromBuffer} from "file-type";
import { fileURLToPath } from "node:url";
import path from 'node:path';
import func from "./func.js";
import { extension } from "mime-types";
import {Message, MessageMedia, Contact, Location, Buttons, List } from 'whatsapp-web.js';
import fetch from "node-fetch";
import { writeExif } from "./sticker.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url))

class Client extends _Client {
    constructor(...args) {
        super(...args)
    }

/**
 * Membuffer file.
 * @param {fs.PathLike} PATH 
 * @param {Boolean} saveToFile
 */
async getFile(PATH, saveToFile = false) {
        let filename, res;
        if (/^https?:\/\//.test(PATH)) {
            let data = await fetch (func.isUrl(PATH))
            res = Buffer.from(await data.arrayBuffer())
        } else if (/^data:.*?\/.*?;base64,/i.test(PATH) || func.isBase64(PATH)) {
            res = Buffer.from(PATH.split`,`[1], 'base64')
        } else if (fs.existsSync(PATH) && (fs.statSync(PATH)).isFile()) {
            res = fs.readFileSync(PATH)
        } else if (Buffer.isBuffer(PATH)) {
            res = PATH
        } else {
            res = Buffer.alloc(20)
        }
         const type = await fileTypeFromBuffer(res) || {
            mime: 'application/octet-stream',
            ext: '.bin'
        }
        if (res && saveToFile && !filename) (filename = path.join(__dirname, '../tmp/' + new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, res))
        return {
            filename, ext: type.ext,
            deleteFile() {
                return filename && fs.promises.unlink(filename)
            }
        }
    }

/**
 * 
 * @param {*} text 
 * @returns 
 */
async parseMention(text) {
  return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@c.us') || []
}

 /**
 * Send Contact
 * @param {String} jid 
 * @param {Array} data
 * @param {String} name
 * @param {Object} options 
 */
 async sendContact(jid, data, name, options = {}) {
  if (!Array.isArray(data) && typeof data === 'string') {data = [data]} else {data}
  try {
  let datas = data.map((v) => ((v.replace(/[^0-9]/g, "")).split("@")[0] + '@c.us'))
  let contacts = []
  for (const contact of datas) {
      contacts.push(await conn.getContactById(contact))
  }
  conn.sendMessage(jid, contacts, options)
 } catch (e) {
  conn.sendMessage(jid, JSON.stringify(e), options)
 } }

/**
 * Mengirim Video / Gambar dalam bentuk Dokumen.
 * @param {String} jid
 * @param {String|Buffer} link
 * @param {String} caption
 * @param {Object} options
 */
async sendDocs(jid, link, namefile= '', caption = '', options) {
        let type = await conn.getFile(link, true)
        let {filename, ext } = type
       let m;
        try {
            m = await conn.sendMessage(jid, filename, { 
              asDocument: true, 
              fileName: `${namefile}${+new Date()}.${ext}`,
              caption: caption, 
              ...options });
        } catch (e) {
            console.error(e)
            m = conn.sendMessage(global.nomor.ownerid, `${JSON.stringify(e)}`)
        } finally {
            if (!m) m = await conn.sendMessage(jid, filename, { 
              asDocument: true, 
              fileName: `${namefile}${+new Date()}.${ext}`,
              caption: caption, 
              ...options});
        return m ,
           fs.unlink(filename, err => {
           if (err) throw console.log(err);
           });

        }
    }


/**
* Mengirim teks
* @param {String} jid
* @param {String} teks
* @param {Object} quoted
* @param {Object} options
*/
async reply(jid, teks, quoted, options) {
  let mentions = conn.parseMention(teks) || []
  let m;
  try {
    m = await conn.sendMessage(jid, teks, { 
    quoted: quoted, 
    mentions: mentions, 
    ...options })
  } catch (e) {
    m = conn.sendMessage(global.nomor.ownerid, `${JSON.stringify(e)}`)
} finally {
    if (!m) m = await conn.sendMessage(jid, teks)
}
}
/**
 * Mengirim AdReply
 * @param {String} jid
 * @param {String|Buffer} link
 * @param {String} caption
 * @param {Object} quoted
 * @param {Object} options
 */
async sendAd(jid, link = '', caption = '', quoted, options = {}) {
        conn.sendMessage(jid , link, {...options,
                caption: caption,
                quoted: quoted.hasQuotedMsg ? quoted.quoted : quoted || {},
                mentions: quoted.isGroup ? quoted.mentionedJid : conn.parseMention(caption) || [],
                extra: {
                    ctwaContext: {
                        title: conn.info.pushname || global.nama.bot || global.nama.author,
                        sourceUrl: global.group.gc1 || 'https://chat.whatsapp.com/JKdIWr5fj990Ux2oqTjTo5',
                        thumbnailUrl: global.logo.thumb || 'https://telegra.ph/file/47b3652155f158b931bda.jpg',
                        description: global.wm.titlebot || `BOTWAWEBJS`,
                        linkPreview: true
                    }
                }
            })  
}
/**
 * Send a message to a specific chatId
 * @param {string} jid
 * @param {string} link
 * @param {string} caption - Options used when sending the message
 * @param {Object} quoted
 * @param {Object} options
 * @returns {Promise<import("whatsapp-web.js").Message>} Message that was just sent
 */
async sendFiles(jid, link = '', namefile = '', caption = '', quoted, ptt = false, options = {}) {
 let m;
  try { 
    let type = await conn.getFile(link, true)
    let {filename, ext } = type
  m = await conn.sendMessage(jid, filename, {
    asDocument: ptt,
    caption: caption,
    fileName: `${namefile}${+new Date()}.${ext}`,
    quoted: quoted.quoted?.id ? (quoted.quoted._serialized || quoted.quoted.id._serialized) : quoted.quoted,
    ...options });
  return m, 
  fs.unlink(filename, err => {
    if (err) throw console.log(err);
    });
    } catch (e) {
      console.error(e)
      m = null
  } finally {
      if (!m) m = await conn.sendMessage(jid,  link, {
        asDocument: ptt,
        caption: caption,
        ...options });
      return m

  }
}
/**
 * Send a message to a specific chatId
 * @param {string} chatId
 * @param {string|MessageMedia|Location|Contact|Array<Contact>|Buttons|List} content
 * @param {string} filename
 * @param {string} caption
 * @param {MessageSendOptions} [options] - Options used when sending the message
 * @param {*} ptt
 * @param {Object} quoted
 * 
 * @returns {Promise<Message>} Message that was just sent
 */
async sendFile(chatId, content, filename = "", caption = "", options, ptt = false, quoted = {}) {
  let internalOptions = {...quoted,
        linkPreview: options.linkPreview,
        sendAudioAsVoice: ptt,
        sendVideoAsGif: options.gifPlayBack,
        sendMediaAsSticker: options.asSticker,
        sendMediaAsDocument: options.asDocument,
        caption: caption,
        quotedMessageId: options.quoted?.id ? options.quoted._serialized || options.quoted.id._serialized : options.quoted,
        parseVCards: options.parseVCards === false ? false : true,
        mentionedJidList: Array.isArray(options.mentions)
          ? options.mentions.map((contact) =>
              contact?.id ? contact?.id?._serialized : contact
            )
          : [],
        extraOptions: options.extra,
      };
  
      if (options.caption) internalOptions.caption = caption;
      const sendSeen =
        typeof options.sendSeen === "undefined" ? true : options.sendSeen;
  
      if (
        Buffer.isBuffer(content) ||
        /^[a-zA-Z0-9+/]*={0,2}$/i.test(content) ||
        /^data:.*?\/.*?;base64,/i.test(content) ||
        /^https?:\/\//.test(content) ||
        fs.existsSync(content)
      ) {
        let media = await func.getFile(content);
        let ex = typeof media === "undefined" ? ".bin" : media.ext;
        if (!options.mimetype && ex === ".bin") {
          content = content;
        } else {
          internalOptions.attachment = {
            mimetype: options.mimetype ? options.mimetype : media.mime,
            data: media?.data?.toString("base64") || Util.bufferToBase64(media.data),
            filename: options.fileName ? filename : Util.getRandom(media.ext),
            filesize: options.fileSize ? options.fileSize : media.size,
          };
          content = "";
        }
      } else if (content instanceof MessageMedia) {
        internalOptions.attachment = content;
        internalOptions.caption = caption;
        content = "";
      } else if (options.media instanceof MessageMedia) {
        internalOptions.attachment = options.media;
        internalOptions.caption = caption;
        content = "";
      } else if (content instanceof Location) {
        internalOptions.location = content;
        content = "";
      } else if (content instanceof Contact) {
        internalOptions.contactCard = content.id
          ? content.id._serialized
          : content;
        content = "";
      } else if (
        Array.isArray(content) &&
        content.length > 0 &&
        content[0] instanceof Contact
      ) {
        internalOptions.contactCardList = content.map((contact) =>
          contact.id ? contact.id._serialized : contact
        );
        content = "";
      } else if (content instanceof Buttons) {
        if (content.type !== "chat") {
          internalOptions.attachment = content.body;
        }
        internalOptions.buttons = content;
        content = "";
      } else if (content instanceof List) {
        internalOptions.list = content;
        content = "";
      }
  
      if (internalOptions.sendMediaAsSticker && internalOptions.attachment) {
        internalOptions.attachment = await writeExif(
          internalOptions.attachment,
          {
            packId: options?.packId ? options.packId : global?.Exif?.packId,
            packName: "BOTWAWEBJS",
            packPublish: global.nama.owner,
            packEmail: "berkahesport@gmail.com",
            packWebsite: "https://instagram.com/berkahesport.id",
            androidApp: options?.androidApp ? options.androidApp : global?.Exif?.androidApp,
            iOSApp: options?.iOSApp ? options.iOSApp : global?.Exif?.iOSApp,
            categories: options?.categories ? options.categories : global?.Exif?.categories,
            isAvatar: options?.isAvatar ? options.isAvatar : global?.Exif?.isAvatar,
          }
        );
      }
  
      const newMessage = await this.mPage.evaluate(
        async ({ chatId, message, options, sendSeen }) => {
          const chatWid = window.Store.WidFactory.createWid(chatId);
          const chat = await window.Store.Chat.find(chatWid);
  
          if (sendSeen) {
            window.WWebJS.sendSeen(chatId);
          }
  
          const msg = await window.WWebJS.sendMessage(
            chat,
            message,
            options,
            sendSeen
          );
          return msg.serialize();
        },
        {
          chatId,
          message: content,
          options: internalOptions,
          sendSeen,
        }
      );
  
      if (newMessage) return new Message(this, newMessage);
    }
/**
 * 
 * @param {*} chatId 
 * @param {*} name 
 * @param {*} choices 
 * @param {*} options 
 * @returns 
 */
async sendPoll(chatId, name, choices, options = {}) {
        let message = await this.mPage.evaluate(async (chatId, name, choices, options) => {
            let rawMessage = {
                waitForAck: true,
                sendSeen: true,
                type: 'poll_creation',
                pollName: name,
                pollOptions: choices.map((name, localId) => ({ name, localId })),
                pollEncKey: self.crypto.getRandomValues(new Uint8Array(32)),
                pollSelectableOptionsCount: options.selectableCount || 0,
                messageSecret: self.crypto.getRandomValues(new Uint8Array(32)),
            }
    
            await window.WWebJS.sendRawMessage(chatId, rawMessage, options)
        }, chatId, name, choices, options)
    
        if (!message) return null
        return new Message(this, message)
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


/**
 * Gets the Contact's common groups with you. Returns empty array if you don't have any common group.
 * @param {string} contactId the whatsapp user's ID (_serialized format)
 * @returns {Promise<WAWebJS.ChatId[]>}
 */
async getCommonGroups(contactId) {
    const commonGroups = await this.mPage.evaluate(async (contactId) => {
        let contact = window.Store.Contact.get(contactId);
        if (!contact) {
            const wid = window.Store.WidFactory.createUserWid(contactId);
            const chatConstructor = window.Store.Contact.getModelsArray().find(c => !c.isGroup).constructor;
            contact = new chatConstructor({ id: wid });
        }

        if (contact.commonGroups) {
            return contact.commonGroups.serialize();
        }
        const status = await window.Store.findCommonGroups(contact);
        if (status) {
            return contact.commonGroups.serialize();
        }
        return [];
    }, contactId);
    const chats = [];
    for (const group of commonGroups) {
        chats.push(await (await this.groupMetadata(group?.id ? group.id._serialized : group)));
    }
    return chats;
}

/**
 * Get All Metadata Groups
 */
async getAllGroups() {
    let groups = await this.mPage.evaluate(() => {
        return window.mR.findModule('queryAllGroups')[0].queryAllGroups()
    })
    const chats = []
    for (const group of groups) {
        chats.push(await (await this.groupMetadata(group?.id ? group.id._serialized : group)))
    }
    return chats
}

/**
 * 
 * @param {string} name 
 * @returns 
 */
async getContactByName(name) {
    let contact = (await this.getContacts()).filter(a => a.name && (a.name.toLowerCase().includes(name) || a.name.includes(name)))

    if (contact.length == 0) return null
    return contact
}

/**
 * 
 * @param {*} chatId 
 * @param {Buffer} content 
 * @returns 
 */
async setProfilePic(chatId, content, type = 'normal') {
    let data
    if ((Buffer.isBuffer(content) || /^data:.*?\/.*?;base64,/i.test(content) || /^https?:\/\//.test(content) || fs.existsSync(content))) {
        let media = await func.getFile(content)
        if (type === 'long') {
            data = {
                img: await (await func.resizeImage(media?.data, 720)).toString('base64'),
                preview: await (await func.resizeImage(media?.data, 120)).toString('base64')
            }
        } else if (type === 'normal') {
            data = {
                img: await (await func.resizeImage(media?.data, 640)).toString('base64'),
                preview: await (await func.resizeImage(media?.data, 96)).toString('base64')
            }
        }
    }

    return this.mPage.evaluate(async (chatId, preview, image, type) => {
        let chatWid = await window.Store.WidFactory.createWid(chatId)

        if (type === 'delete') return window.Store.GroupUtils.requestDeletePicture(chatWid)

        return window.Store.GroupUtils.sendSetPicture(chatWid, image, preview)
    }, chatId, data.img, data.preview, type)
}
/**
 * 
 * @param {*} chatId 
 * @param {*} msgId 
 */
async forwardMessage(chatId, msgId, options = {}) {
  if (!msgId) throw new Error("No Input Message ID")
  if (!chatId) throw new Error("No Input Chat ID")
      await this.mPage.evaluate(async ({ msgId, chatId, options }) => {
          let msg = window.Store.Msg.get(msgId)

          await msg.serialize()

          if (options?.mentions) {
              msg.mentionedJidList = options.mentions.map(cId => window.Store.WidFactory.createWid(cId));

              delete options.mentions
          }

          if (options?.text) {
              if (msg.type === 'chat') msg.body = options.text
              else {
                  msg.caption = ''
                  msg.caption = options.text
              }

              delete options.text
          }

          let chat = window.Store.Chat.get(chatId)

          return await chat.forwardMessages([msg])
      }, { msgId, chatId, options })
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
    // Untuk kustom pesan.
    if (m.isMedia) m.downloadMedia = (filePath) => {
        if (filePath) return conn.downloadAndSaveMediaMessage(m, filePath)
        else return conn.downloadMediaMessage(m)
    }
    m.reply = (content, options = {}) => conn.sendMessage(options.from ? options.from : m.from, content, { quoted: m, ...options })
    m.send = (owner, content, options = {}) => conn.sendMessage(owner, content, { quoted: m, ...options })
    m.resend = () => conn.forwardMessage(m.from, m._serialized)
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

async function protoType() {
  Buffer.prototype.toArrayBuffer = function toArrayBufferV2() {
      const ab = new ArrayBuffer(this.length);
      const view = new Uint8Array(ab);
      for (let i = 0; i < this.length; ++i) {
          view[i] = this[i];
      }
      return ab;
  }
  /**
   * @returns {ArrayBuffer}
   */
  Buffer.prototype.toArrayBufferV2 = function toArrayBuffer() {
      return this.buffer.slice(this.byteOffset, this.byteOffset + this.byteLength)
  }
  /**
   * @returns {Buffer}
   */
  ArrayBuffer.prototype.toBuffer = function toBuffer() {
      return Buffer.from(new Uint8Array(this))
  }
  // /**
  //  * @returns {String}
  //  */
  // Buffer.prototype.toUtilFormat = ArrayBuffer.prototype.toUtilFormat = Object.prototype.toUtilFormat = Array.prototype.toUtilFormat = function toUtilFormat() {
  //     return util.format(this)
  // }
  Uint8Array.prototype.getFileType = ArrayBuffer.prototype.getFileType = Buffer.prototype.getFileType = async function getFileType() {
      return await fileTypeFromBuffer(this)
  }
  /**
   * @returns {Boolean}
   */
  String.prototype.isNumber = Number.prototype.isNumber = isNumber
  /**
   * 
   * @returns {String}
   */
  String.prototype.capitalize = function capitalize() {
      return this.charAt(0).toUpperCase() + this.slice(1, this.length)
  }
  /**
   * @returns {String}
   */
  String.prototype.capitalizeV2 = function capitalizeV2() {
      const str = this.split(' ')
      return str.map(v => v.capitalize()).join(' ')
  }
  String.prototype.decodeJid = function decodeJid() {
      if (/:\d+@/gi.test(this)) {
          const decode = jidDecode(this) || {}
          return (decode.user && decode.server && decode.user + '@' + decode.server || this).trim()
      } else return this.trim()
  }
  /**
   * number must be milliseconds
   * @returns {string}
   */
  Number.prototype.toTimeString = function toTimeString() {
      // const milliseconds = this % 1000
      const seconds = Math.floor((this / 1000) % 60)
      const minutes = Math.floor((this / (60 * 1000)) % 60)
      const hours = Math.floor((this / (60 * 60 * 1000)) % 24)
      const days = Math.floor((this / (24 * 60 * 60 * 1000)))
      return (
          (days ? `${days} hari` : '') +
          (hours ? `${hours} jam ` : '') +
          (minutes ? `${minutes} menit ` : '') +
          (seconds ? `${seconds} detik` : '')
      ).trim()
  }
  Number.prototype.getRandom = String.prototype.getRandom = Array.prototype.getRandom = getRandom
}
function isNumber() {
  const int = parseInt(this)
  return typeof int === 'number' && !isNaN(int)
}

function getRandom() {
  if (Array.isArray(this) || this instanceof String) return this[Math.floor(Math.random() * this.length)]
  return Math.floor(Math.random() * this)
}


/**
* ??
* @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
* @returns {boolean}
*/
function nullish(args) {
  return !(args !== null && args !== undefined)
}



export { Client, smsg, protoType }

// let fileP = fileURLToPath(import.meta.url)
// fs.watchFile(fileP, () => {
// fs.unwatchFile(fileP)
// console.log(`Update File "${fileP}"`)
// import(`${import.meta.url}?update=${Date.now()}`)
// })
/* <===== ISI eval m =====>
Message {
  _data: {
    id: {
      fromMe: false,
      remote: '62895375950107@c.us',
      id: '149BBA0F0C40B2F35F0E378348DBA6FB',
      _serialized: 'false_62895375950107@c.us_149BBA0F0C40B2F35F0E378348DBA6FB'
    },
    rowId: undefined,
    serverId: undefined,
    body: '=> m',
    type: 'chat',
    subtype: undefined,
    t: 1689215275,
    revokeTimestamp: undefined,
    notifyName: 'Owner BE 1',
    from: {
      server: 'c.us',
      user: '62895375950107',
      _serialized: '62895375950107@c.us'
    },
    to: {
      server: 'c.us',
      user: '62882006194598',
      _serialized: '62882006194598@c.us'
    },
    author: undefined,
    self: 'in',
    ack: 1,
    invis: undefined,
    isNewMsg: true,
    star: false,
    kicKey: undefined,
    kicState: undefined,
    kicTimestampMs: undefined,
    kicNotified: false,
    keepType: undefined,
    keptMessageKey: undefined,
    keptCount: undefined,
    recvFresh: true,
    caption: undefined,
    interactiveAnnotations: undefined,
    contextInfo: undefined,
    clientUrl: undefined,
    loc: undefined,
    lat: undefined,
    lng: undefined,
    isLive: undefined,
    accuracy: undefined,
    speed: undefined,
    degrees: undefined,
    comment: undefined,
    sequence: undefined,
    shareDuration: undefined,
    finalLat: undefined,
    finalLng: undefined,
    finalAccuracy: undefined,
    finalThumbnail: undefined,
    finalSpeed: undefined,
    finalDegrees: undefined,
    finalTimeOffset: undefined,
    deprecatedMms3Url: undefined,
    directPath: undefined,
    mimetype: undefined,
    duration: undefined,
    filehash: undefined,
    encFilehash: undefined,
    size: undefined,
    filename: undefined,
    streamingSidecar: undefined,
    mediaKey: undefined,
    mediaKeyTimestamp: undefined,
    pageCount: undefined,
    isGif: undefined,
    gifAttribution: undefined,
    isViewOnce: undefined,
    streamable: undefined,
    width: undefined,
    height: undefined,
    thumbnailDirectPath: undefined,
    thumbnailSha256: undefined,
    thumbnailEncSha256: undefined,
    thumbnailHeight: undefined,
    thumbnailWidth: undefined,
    waveform: undefined,
    staticUrl: undefined,
    stickerPackId: undefined,
    stickerPackName: undefined,
    stickerPackPublisher: undefined,
    mediaHandle: undefined,
    scanLengths: undefined,
    scansSidecar: undefined,
    isFromTemplate: false,
    devicesAdded: undefined,
    devicesRemoved: undefined,
    isThisDeviceAdded: undefined,
    firstFrameLength: undefined,
    firstFrameSidecar: undefined,
    isAnimated: undefined,
    canonicalUrl: undefined,
    matchedText: undefined,
    thumbnail: undefined,
    thumbnailHQ: undefined,
    richPreviewType: undefined,
    doNotPlayInline: undefined,
    rcat: undefined,
    title: undefined,
    description: undefined,
    businessOwnerJid: undefined,
    productId: undefined,
    currencyCode: undefined,
    priceAmount1000: undefined,
    salePriceAmount1000: undefined,
    retailerId: undefined,
    url: undefined,
    productImageCount: undefined,
    sessionId: undefined,
    pollName: undefined,
    pollOptions: undefined,
    pollSelectableOptionsCount: undefined,
    pollInvalidated: false,
    isSentCagPollCreation: false,
    pollUpdateParentKey: undefined,
    encPollVote: undefined,
    senderTimestampMs: undefined,
    latestEditMsgKey: null,
    latestEditSenderTimestampMs: null,
    editMsgType: undefined,
    recipients: undefined,
    broadcast: false,
    quotedMsg: undefined,
    quotedStanzaID: undefined,
    quotedRemoteJid: undefined,
    quotedParticipant: undefined,
    quotedGroupSubject: undefined,
    quotedParentGroupJid: undefined,
    mentionedJidList: [],
    reporterJidList: undefined,
    groupMentions: [],
    footer: undefined,
    hydratedButtons: undefined,
    hsmTag: undefined,
    hsmCategory: undefined,
    templateId: undefined,
    selectedId: undefined,
    selectedIndex: undefined,
    multicast: undefined,
    urlText: undefined,
    urlNumber: undefined,
    clearMedia: undefined,
    isVcardOverMmsDocument: false,
    isCaptionByUser: undefined,
    vcardList: undefined,
    vcardFormattedName: undefined,
    revokeSender: undefined,
    protocolMessageKey: undefined,
    futureproofBuffer: undefined,
    futureproofParams: undefined,
    futureproofType: undefined,
    futureproofSubtype: undefined,
    templateParams: undefined,
    textColor: undefined,
    backgroundColor: undefined,
    font: undefined,
    campaignId: undefined,
    campaignDuration: undefined,
    actionLink: undefined,
    statusPSAReadTimestamp: undefined,
    isForwarded: false,
    forwardingScore: undefined,
    labels: [],
    hasReaction: false,
    paymentCurrency: undefined,
    paymentAmount1000: undefined,
    paymentMessageReceiverJid: undefined,
    paymentTransactionTimestamp: undefined,
    paymentStatus: undefined,
    paymentTxnStatus: undefined,
    paymentNoteMsg: undefined,
    paymentRequestMessageKey: undefined,
    paymentExpiryTimestamp: undefined,
    paymentInviteServiceType: undefined,
    paymentBackground: undefined,
    ephemeralStartTimestamp: undefined,
    ephemeralDuration: undefined,
    ephemeralSettingTimestamp: undefined,
    ephemeralOutOfSync: undefined,
    ephemeralSharedSecret: undefined,
    disappearingModeInitiator: undefined,
    ephemeralSettingUser: undefined,
    messageSecret: undefined,
    originalSelfAuthor: undefined,
    bizPrivacyStatus: undefined,
    privacyModeWhenSent: undefined,
    verifiedBizName: undefined,
    inviteCode: undefined,
    inviteCodeExp: undefined,
    inviteGrp: undefined,
    inviteGrpName: undefined,
    inviteGrpJpegThum: undefined,
    inviteGrpType: undefined,
    sellerJid: undefined,
    message: undefined,
    orderTitle: undefined,
    itemCount: undefined,
    orderId: undefined,
    surface: undefined,
    status: undefined,
    token: undefined,
    totalAmount1000: undefined,
    totalCurrencyCode: undefined,
    historySyncMetaData: undefined,
    isSendFailure: undefined,
    errorCode: undefined,
    appStateSyncKeyShare: undefined,
    appStateSyncKeyRequest: undefined,
    appStateFatalExceptionNotification: undefined,
    peerDataOperationRequestMessage: undefined,
    peerDataOperationRequestResponseMessage: undefined,
    broadcastParticipants: undefined,
    broadcastEphSettings: undefined,
    broadcastId: undefined,
    ctwaContext: undefined,
    list: undefined,
    listResponse: undefined,
    productListItemCount: undefined,
    productHeaderImageRejected: false,
    agentId: undefined,
    lastPlaybackProgress: 0,
    isDynamicReplyButtonsMsg: false,
    dynamicReplyButtons: undefined,
    buttonsResponse: undefined,
    selectedButtonId: undefined,
    headerType: undefined,
    nativeFlowName: undefined,
    nativeFlowButtons: undefined,
    interactiveHeader: undefined,
    interactiveType: undefined,
    interactivePayload: undefined,
    reactionParentKey: undefined,
    reactionText: undefined,
    reactionTimestamp: undefined,
    encReactionTargetMessageKey: undefined,
    encReactionEncIv: undefined,
    encReactionEncPayload: undefined,
    pinParentKey: undefined,
    pinMessageType: undefined,
    pinSenderTimestampMs: undefined,
    pinExpiryDuration: undefined,
    isMdHistoryMsg: false,
    stickerSentTs: 0,
    isAvatar: false,
    bizSource: undefined,
    lastUpdateFromServerTs: 0,
    botEditType: undefined,
    requiresDirectConnection: false,
    invokedBotWid: null,
    botMessageSecret: undefined,
    isEphemeral: undefined,
    isStatusV3: undefined,
    links: []
  },
  mediaKey: undefined,
  id: {
    fromMe: false,
    remote: '62895375950107@c.us',
    id: '149BBA0F0C40B2F35F0E378348DBA6FB',
    _serialized: 'false_62895375950107@c.us_149BBA0F0C40B2F35F0E378348DBA6FB'
  },
  ack: 1,
  hasMedia: false,
  body: '=> m',
  type: 'chat',
  timestamp: 1689215275,
  from: '62895375950107@c.us',
  to: '62882006194598@c.us',
  author: undefined,
  deviceType: 'android',
  isForwarded: false,
  forwardingScore: 0,
  isStatus: false,
  isStarred: false,
  broadcast: false,
  fromMe: false,
  hasQuotedMsg: false,
  duration: undefined,
  location: undefined,
  vCards: [],
  inviteV4: undefined,
  mentionedIds: [],
  orderId: undefined,
  token: undefined,
  isGif: false,
  isEphemeral: undefined,
  links: [],
  plugin: 'eval.js',
  isCommand: true,
  exp: 3
}
*/