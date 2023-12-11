/*
"Jangan diganti kang! Kasian gw nyamain serialize Baileys juga butuh waktu!"

Dibuat pada tanggal 09 Desember 2023 oleh @moexti
Donasi bolehlah kang!
Scan aja gambar qrcode.jpg
Atau https://wa.me/62895375950107

## Owner: BerkahEsport.ID
*/
import { Client as _Client } from "whatsapp-web.js"
import fs from 'fs';
import {fileTypeFromBuffer} from "file-type";
import { fileURLToPath } from "node:url";
import path from 'node:path';
import func from "./func.js";
import { extension } from "mime-types";
import mywajs from 'whatsapp-web.js';
const {Message, MessageMedia, Contact, Buttons, List, Location, Poll } = mywajs
import Util from "whatsapp-web.js/src/util/Util.js";
import fetch from "node-fetch";
const __dirname = path.dirname(fileURLToPath(import.meta.url))

class Client extends _Client {
    constructor(...args) {
        super(...args)
    }
/**
     * Message options.
     * @typedef {Object} MessageSendOptions
     * @property {boolean} [linkPreview=true] - Show links preview. Has no effect on multi-device accounts.
     * @property {boolean} [sendAudioAsVoice=false] - Send audio as voice message with a generated waveform
     * @property {boolean} [sendVideoAsGif=false] - Send video as gif
     * @property {boolean} [sendMediaAsSticker=false] - Send media as a sticker
     * @property {boolean} [sendMediaAsDocument=false] - Send media as a document
     * @property {boolean} [isViewOnce=false] - Send photo/video as a view once message
     * @property {boolean} [parseVCards=true] - Automatically parse vCards and send them as contacts
     * @property {string} [caption] - Image or video caption
     * @property {string} [quotedMessageId] - Id of the message that is being quoted (or replied to)
     * @property {Contact[]} [mentions] - Contacts that are being mentioned in the message
     * @property {boolean} [sendSeen=true] - Mark the conversation as seen after sending the message
     * @property {string} [stickerAuthor=undefined] - Sets the author of the sticker, (if sendMediaAsSticker is true).
     * @property {string} [stickerName=undefined] - Sets the name of the sticker, (if sendMediaAsSticker is true).
     * @property {string[]} [stickerCategories=undefined] - Sets the categories of the sticker, (if sendMediaAsSticker is true). Provide emoji char array, can be null.
     * @property {MessageMedia} [media] - Media to be sent
     */

    /**
     * Send a message to a specific chatId
     * @param {string} chatId
     * @param {string|MessageMedia|Location|Poll|Contact|Array<Contact>|Buttons|List} content
     * @param {MessageSendOptions} [options] - Options used when sending the message
     *
     * @returns {Promise<Message>} Message that was just sent
     */
    async sendMessage(chatId, content, options = {}) {
        let internalOptions = {
            linkPreview: options.linkPreview,
            sendAudioAsVoice: options.ptt,
            sendVideoAsGif: options.gifPlayBack,
            sendMediaAsSticker: options.asSticker,
            sendMediaAsDocument: options.asDocument,
            caption: options.caption,
            quotedMessageId: options.quoted?.id ?
                options.quoted._serialized || options.quoted.id._serialized :
                options.quoted,
            parseVCards: options.parseVCards === false ? false : true,
            mentionedJidList: Array.isArray(options.mentions) ?
                options.mentions.map((contact) =>
                    contact?.id ? contact?.id?._serialized : contact
                ) :
                [],
            groupMentions: options.groupMentions,
            extraOptions: options.extra,
        };

        options.groupMentions && !Array.isArray(options.groupMentions) && (options.groupMentions = [options.groupMentions]);

        if (options.caption) internalOptions.caption = options.caption;
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
                    data: media?.data?.toString("base64") || func.bufferToBase64(media.data),
                    filename: options.fileName ?
                        options.fileName :
                        func.getRandom(media.ext),
                    filesize: options.fileSize ? options.fileSize : media.size,
                };
                content = "";
            }
        } else if (content instanceof MessageMedia) {
            internalOptions.attachment = content;
            content = "";
        } else if (options.media instanceof MessageMedia) {
            internalOptions.attachment = options.media;
            internalOptions.caption = content;
            content = "";
        } else if (content instanceof Location) {
            internalOptions.location = content;
            content = '';
        } else if (content instanceof Poll) {
            internalOptions.poll = content;
            content = '';
        } else if (content instanceof Contact) {
            internalOptions.contactCard = content.id._serialized;
            content = '';
        } else if (Array.isArray(content) && content.length > 0 && content[0] instanceof Contact) {
            internalOptions.contactCardList = content.map(contact => contact.id._serialized);
            content = '';
        }

        if (internalOptions.sendMediaAsSticker && internalOptions.attachment) {
            internalOptions.attachment = await Util.formatToWebpSticker(
                internalOptions.attachment, {
                packId: options?.packId ? options.packId : global?.Exif?.packId,
                packName: options?.packName ?
                    options.packName :
                    global?.Exif?.packName,
                packPublish: options?.packPublish ?
                    options.packPublish :
                    global?.Exif?.packPublish,
                packEmail: options?.packEmail ?
                    options.packEmail :
                    global?.Exif?.packEmail,
                packWebsite: options?.packWebsite ?
                    options.packWebsite :
                    global?.Exif?.packWebsite,
                androidApp: options?.androidApp ?
                    options.androidApp :
                    global?.Exif?.androidApp,
                iOSApp: options?.iOSApp ? options.iOSApp : global?.Exif?.iOSApp,
                categories: options?.categories ?
                    options.categories :
                    global?.Exif?.categories,
                isAvatar: options?.isAvatar ?
                    options.isAvatar :
                    global?.Exif?.isAvatar,
            },
                this.playPage
            );
        }
        const newMessage = await this.playPage.evaluate(async ({ chatId, message, options, sendSeen }) => {
            const chatWid = window.WPP.whatsapp.WidFactory.createWid(chatId);
            const chat = await window.WPP.whatsapp.ChatStore.find(chatWid);


            if (sendSeen) {
                await window.WPP.whatsapp.functions.sendSeen(chat, false);
            }

            const msg = await window.WAJS.sendMessage(chat, message, options, sendSeen);
            return msg.serialize();
        }, { chatId, message: content, options: internalOptions, sendSeen });

        return new Message(this, newMessage);
    }
/**
 * get name whatsapp
 * @param {*} jid 
 * @returns 
 */
async getName(jid) {
    const contact = await this.getContactById(jid);
    return (
        contact.name || contact.pushname || contact.shortName || contact.number
    );
}
/**
 * Returns the contact ID's profile picture URL, if privacy settings allow it
 * @param {string} contactId the whatsapp user's ID
 * @returns {Promise<string>}
 */
async profilePictureUrl(contactId) {
    const profilePic = await this.playPage.evaluate(async contactId => {
        return await window.WPP.contact.getProfilePictureUrl(contactId);
    }, contactId);

    return profilePic ? profilePic : undefined;
}
/**
 * Check if a given ID is registered in whatsapp
 * @param {string} id the whatsapp user's ID
 * @returns {Promise<Boolean>}
 */
async onWhatsApp(id) {
    let verify = Boolean(await this.getNumberId(id));
    return verify ? [{exists: true, jid: id}] : [{exists: false, jid: id}]
}
/**
 * Out of Group
 * @param {*} m 
 */
async groupLeave(m) {
    let chat = await m.getChat();
        if (chat.isGroup) {
            chat.leave()
        }
}
/**
 * Accepts an invitation to join a group
 * @param {string} inviteCode Invitation code
 * @returns {Promise<string>} Id of the joined Chat
 */
async groupAcceptInvite(inviteCode) {
    const res = await this.playPage.evaluate(async inviteCode => {
        return await window.WPP.group.join(inviteCode);
    }, inviteCode);
    return res.gid._serialized;
}

/**
 * Membuffer file.
 * @param {fs.PathLike} PATH 
 * @param {Boolean} saveToFile
 */
async getFile(PATH, saveToFile = true) {
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
        return filename
    }

/**
 * 
 * @param {*} text 
 * @returns 
 */
async parseMention(text) {
    if (text == undefined) return [this.info.wid._serialized]
    else return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@c.us') || []
}
/**
 * 
 * @param {*} groupId
 * @returns 
 */
async groupMetadata(groupId) {
  let chat = await this.playPage.evaluate(async (groupId) => {
      let groupWid = window.WPP.whatsapp.WidFactory.createWid(groupId);
      let metadata = await window.WPP.whatsapp.GroupMetadataStore.find(groupWid);

      return metadata.serialize();
  }, groupId);

  if (!chat) return false;
  let participants = chat.participants.map(participant => {
    const { id, isAdmin, isSuperAdmin } = participant;
    return { id: id._serialized, admin: isSuperAdmin ? "superadmin" : isAdmin ? "admin" : "null" };
  });
  let chats = {
    id: chat?.id._serialized,
    subject: chat?.subject,
    subjectOwner: chat?.descOwner._serialized,
    subjectTime: chat?.subjectTime,
    creation: chat?.creation,
    owner: chat?.owner?._serialized,
    desc: chat?.desc,
    descId: chat?.descId,
    restrict: chat?.restrict,
    announce: chat?.announce,
    participants,
    ephemeralDuration: chat?.ephemeralDuration
  }
  return chats;
}
 /**
 * Send Contact
 * @param {String} jid 
 * @param {Array} data
 * @param {String} name
 * @param {Object} options 
 */
 async sendContact(jid, data, quoted, options = {}) {
  if (!Array.isArray(data) && typeof data === 'string') {data = [data]} else {data}
  try {
  let datas = data.map((v) => ((v.replace(/[^0-9]/g, "")).split("@")[0] + '@c.us'))
  let contacts = []
  for (const contact of datas) {
      contacts.push(await this.getContactById(contact))
  }
  this.sendMessage(jid, contacts, { quoted, ...options})
 } catch (e) {
  this.sendMessage(jid, JSON.stringify(e), { quoted, ...options})
 } }


/**
* Mengirim teks
* @param {String} jid
* @param {String} text
* @param {Object} quoted
*/
async reply(jid, text, quoted, options = {}) {
  if (typeof text == 'object') {
    return this.sendMessage(jid, func.format(text), { mentions: this.parseMention(func.Format(text)), quoted, ...options });
  } else {
     return this.sendMessage(jid, text, { mentions: this.parseMention(text), quoted, ...options });
  }
}
/**
 * Mengirim AdReply
 * @param {String} jid
 * @param {String|Buffer} link
 * @param {String} caption
 * @param {Object} quoted
 */
async sendAd(jid, link = '', caption = '', quoted) {
    this.sendMessage(jid , link, {
            caption: caption,
            quoted: quoted?.hasQuotedMsg ? quoted.quoted : quoted || "",
            mentions: quoted?.isGroup ? quoted.mentions : this.parseMention(caption) || [],
            extra: {
                ctwaContext: {
                    title: this.info.pushname || global.nama.bot || global.nama.author,
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
 * @param {string} chatId
 * @param {string|MessageMedia|Location|Contact|Array<Contact>|Buttons|List} content
 * @param {string} filename
 * @param {string} captions
 * @param {MessageSendOptions} [options] - Options used when sending the message
 * @param {*} ptt
 * @param {Object} quoted 
 * 
 * @returns {Promise<Message>} Message that was just sent
 */
async sendFile(chatId, content, filename = "", captions = "", quoted, options = {}, ptt = false) {
  let internalOptions = {
     linkPreview: options.linkPreview,
     sendAudioAsVoice: ptt,
     sendMediaAsDocument: options.asDocument,
     caption: captions,
     quotedMessageId: quoted?.id ? quoted._serialized || quoted.id._serialized : quoted,
     parseVCards: options.parseVCards === false ? false : true,
     mentionedJidList: Array.isArray(options.mentions)
        ? options.mentions.map((contact) =>
           contact?.id ? contact?.id?._serialized : contact
        )
        : [],
     extraOptions: options.extra,
  };

  if (options.caption) internalOptions.caption = captions;
  const sendSeen =
     typeof options.sendSeen === "undefined" ? true : options.sendSeen;

  if (
     Buffer.isBuffer(content) ||
     /^[a-zA-Z0-9+/]*={0,2}$/i.test(content) ||
     /^data:.?\/.?;base64,/i.test(content) ||
     /^https?:\/\//.test(content) ||
     fs.existsSync(content)
  ) {
     let media = await func.getFiles(content);
     let ex = typeof media === "undefined" ? ".bin" : media.ext;
     if (!options.mimetype && ex === ".bin") {
        content = content;
     } else {
        internalOptions.attachment = {
           mimetype: options.mimetype ? options.mimetype : media.mime,
           data: media?.data?.toString("base64") || func.bufferToBase64(media.data),
           filename: filename ? filename : "BOTBE_"+func.getRandom(media.ext, "3"),
           filesize: options.fileSize ? options.fileSize : media.size,
        };
        content = "";
     }
  } else if (content instanceof MessageMedia) {
     internalOptions.attachment = content;
     internalOptions.caption = captions;
     content = "";
  } else if (options.media instanceof MessageMedia) {
     internalOptions.attachment = options.media;
     internalOptions.caption = captions;
     content = "";
  }
  const newMessage = await this.playPage.evaluate(
     async ({ chatId, message, options, sendSeen }) => {
        const chatWid = window.WPP.whatsapp.WidFactory.createWid(chatId);
        const chat = await window.WPP.whatsapp.ChatStore.find(chatWid);

        if (sendSeen) {
           await window.WPP.whatsapp.functions.sendSeen(chat, false);
        }

        const msg = await window.WAJS.sendMessage(
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
        let message = await this.playPage.evaluate(async (chatId, name, choices, options) => {
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

  const result = await this.playPage.evaluate(async ({ directPath, encFilehash, filehash, mediaKey, type, mediaKeyTimestamp, mimetype, filename, size, _serialized }) => {
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
              data: await window.WWebJS.func.blobToBase64(blob),
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
async groupFetchAllParticipating(contactId = this.info.me._serialized || this.info.wid._serialized) {
    const commonGroups = await this.playPage.evaluate(async (contactId) => {
        let contact = window.WPP.whatsapp.ContactStore.get(contactId);
        if (!contact) {
            const wid = window.WPP.whatsapp.WidFactory.createUserWid(contactId);
            const chatConstructor = window.WPP.whatsapp.ContactStore.getModelsArray().find(c => !c.isGroup).constructor;
            contact = new chatConstructor({ id: wid });
        }

        if (contact.commonGroups) {
            return contact.commonGroups.serialize();
        }
        const status = await window.WPP.whatsapp.functions.findCommonGroups(contact);
        if (status) {
            return contact.commonGroups.serialize();
        }
        return [];
    }, contactId);
    const chats = [];
    for (const group of commonGroups) {
        chats.push(group.id._serialized);
    }
    return chats;
}

/**
 * Get All Metadata Groups
 */
async getAllGroups() {
    let groups = await this.playPage.evaluate(() => {
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

    return this.playPage.evaluate(async (chatId, preview, image, type) => {
        let chatWid = await window.Store.WidFactory.createWid(chatId)

        if (type === 'delete') return window.Store.Groupfuncs.requestDeletePicture(chatWid)

        return window.Store.Groupfuncs.sendSetPicture(chatWid, image, preview)
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
      await this.playPage.evaluate(async ({ msgId, chatId, options }) => {
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
  // Buffer.prototype.tofuncFormat = ArrayBuffer.prototype.tofuncFormat = Object.prototype.tofuncFormat = Array.prototype.tofuncFormat = function tofuncFormat() {
  //     return func.format(this)
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





export { Client, protoType }

let fileP = fileURLToPath(import.meta.url)
fs.watchFile(fileP, () => {
fs.unwatchFile(fileP)
console.log(`Update File "${fileP}"`)
import(`${import.meta.url}?update=${Date.now()}`)
})
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