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
function _0x4b9e(){const _0x29664b=['_serialized','text','fromMe','vCards','replace','width','downloadMediaMessage','sender','arg','chat','thumbnailWidth','isBot','3806450kJcZAp','owner','filehash','includes','mediaKeyTimestamp','find','1008VcOPaU','isViewOnce','isAdmin','wid','encFilehash','isEphemeral','downloadMedia','isGroup','676284mrELLT','isBotAdmin','sendMessage','endsWith','orderId','26uABYGp','pushName','g.us','selectedRowId','groupAdmins','hasMedia','split','botNumber','reply','directPath','477ShQXnX','fileSize','args','hasQuotedMsg','BAE5','object','mentionedJidList','trim','startsWith','38339cSAlJa','wavefrom','body','location','info','deprecatedMms3Url','2419360FiiSjr','_data','isSuperAdmin','github','isAnimated','filter','getQuotedMessage','caption','map','mentionedJid','isForwarded','mime','user','height','isStatus','104100mVzgxZ','isNewMsg','4493448vGQxLB','3EB0','remote','participants','forwardingScore','participant','isGif','ephemeralDuration','isMedia','quoted','isOwner','thumbnailHeight','size','isArray','downloadAndSaveMediaMessage','token','mediaKey','pushname','from','metadata','10326HzwKvw','author','mentionedIds'];_0x4b9e=function(){return _0x29664b;};return _0x4b9e();}(function(_0x28eb31,_0x2855eb){const _0x54f20c=_0x29da,_0xbb9d41=_0x28eb31();while(!![]){try{const _0x491771=-parseInt(_0x54f20c(0x160))/0x1*(-parseInt(_0x54f20c(0x122))/0x2)+-parseInt(_0x54f20c(0x17d))/0x3+parseInt(_0x54f20c(0x13b))/0x4+parseInt(_0x54f20c(0x16f))/0x5+-parseInt(_0x54f20c(0x14c))/0x6+parseInt(_0x54f20c(0x135))/0x7*(-parseInt(_0x54f20c(0x175))/0x8)+parseInt(_0x54f20c(0x12c))/0x9*(parseInt(_0x54f20c(0x14a))/0xa);if(_0x491771===_0x2855eb)break;else _0xbb9d41['push'](_0xbb9d41['shift']());}catch(_0x2b408d){_0xbb9d41['push'](_0xbb9d41['shift']());}}}(_0x4b9e,0x5ea4c));function _0x29da(_0xa06954,_0x319bda){const _0x4b9e57=_0x4b9e();return _0x29da=function(_0x29dae9,_0x2db2be){_0x29dae9=_0x29dae9-0x121;let _0x3bbde2=_0x4b9e57[_0x29dae9];return _0x3bbde2;},_0x29da(_0xa06954,_0x319bda);}const smsg=async(_0x5078f6,_0x157ffd)=>{const _0x1edfc2=_0x29da;_0x5078f6[_0x1edfc2(0x139)]&&(_0x5078f6['user']={'id':_0x5078f6[_0x1edfc2(0x139)]['me'][_0x1edfc2(0x147)]||_0x5078f6[_0x1edfc2(0x139)][_0x1edfc2(0x178)]['user'],'jid':_0x5078f6['info']['me'][_0x1edfc2(0x163)]||_0x5078f6['info'][_0x1edfc2(0x178)][_0x1edfc2(0x163)],'pushname':_0x5078f6[_0x1edfc2(0x139)][_0x1edfc2(0x15d)]});if(!_0x157ffd)return;_0x157ffd?.['_data']?.['id']&&(_0x157ffd['id']={'remote':_0x157ffd[_0x1edfc2(0x13c)]['id'][_0x1edfc2(0x14e)]||_0x157ffd[_0x1edfc2(0x13c)]['to'],'participant':typeof _0x157ffd[_0x1edfc2(0x13c)][_0x1edfc2(0x161)]===_0x1edfc2(0x131)&&_0x157ffd['_data']['author']!==null?_0x157ffd['_data'][_0x1edfc2(0x161)][_0x1edfc2(0x163)]:_0x157ffd[_0x1edfc2(0x13c)][_0x1edfc2(0x161)],'fromMe':_0x157ffd['_data']['id'][_0x1edfc2(0x165)],'id':_0x157ffd[_0x1edfc2(0x13c)]['id']['id'],'_serialized':_0x157ffd['_data']['id'][_0x1edfc2(0x163)]});_0x157ffd[_0x1edfc2(0x13e)]='https://github.com/BerkahEsport/botwawebjs',_0x157ffd[_0x1edfc2(0x15e)]=_0x157ffd['id'][_0x1edfc2(0x14e)],_0x157ffd[_0x1edfc2(0x16a)]=_0x157ffd['id'][_0x1edfc2(0x151)]||_0x157ffd[_0x1edfc2(0x13c)]['from']['_serialized']||_0x157ffd[_0x1edfc2(0x13c)]['from']||_0x157ffd[_0x1edfc2(0x15e)],_0x157ffd[_0x1edfc2(0x16c)]=_0x157ffd[_0x1edfc2(0x15e)]['endsWith'](_0x1edfc2(0x124))?_0x157ffd['from']:_0x157ffd[_0x1edfc2(0x16a)],_0x157ffd[_0x1edfc2(0x17c)]=_0x157ffd[_0x1edfc2(0x15e)][_0x1edfc2(0x180)]('g.us')||![],_0x157ffd[_0x1edfc2(0x156)]=[...global[_0x1edfc2(0x170)][_0x1edfc2(0x143)](([_0x5766dd])=>_0x5766dd)][_0x1edfc2(0x143)](_0x26f2d8=>_0x26f2d8?.[_0x1edfc2(0x167)](/[^0-9]/g,''))[_0x1edfc2(0x172)](_0x157ffd[_0x1edfc2(0x16a)][_0x1edfc2(0x128)]('@')[0x0]),_0x157ffd[_0x1edfc2(0x123)]=_0x157ffd[_0x1edfc2(0x13c)]['notifyName'],_0x157ffd[_0x1edfc2(0x16e)]=_0x157ffd['id']?.['id']?.[_0x1edfc2(0x134)](_0x1edfc2(0x14d))||_0x157ffd['id']?.['id']?.[_0x1edfc2(0x134)](_0x1edfc2(0x130))||![];if(_0x5078f6[_0x1edfc2(0x139)])_0x157ffd[_0x1edfc2(0x129)]=_0x5078f6[_0x1edfc2(0x139)]['me'][_0x1edfc2(0x163)]||_0x5078f6[_0x1edfc2(0x139)][_0x1edfc2(0x178)][_0x1edfc2(0x163)];_0x157ffd[_0x1edfc2(0x144)]=Array[_0x1edfc2(0x159)](_0x157ffd[_0x1edfc2(0x13c)][_0x1edfc2(0x132)])&&_0x157ffd[_0x1edfc2(0x13c)][_0x1edfc2(0x132)]['length']!==0x0?_0x157ffd[_0x1edfc2(0x13c)][_0x1edfc2(0x132)]['map'](_0x2fca23=>_0x2fca23[_0x1edfc2(0x163)]):[],_0x157ffd[_0x1edfc2(0x163)]=_0x157ffd['id']['_serialized'],_0x157ffd[_0x1edfc2(0x154)]=_0x157ffd[_0x1edfc2(0x127)],_0x157ffd[_0x1edfc2(0x14b)]=_0x157ffd[_0x1edfc2(0x13c)]['isNewMsg'],_0x157ffd['ephemeralDuration']=_0x157ffd['_data'][_0x1edfc2(0x153)]||0x0;if(_0x157ffd['isMedia']){_0x157ffd[_0x1edfc2(0x13a)]=_0x157ffd['_data']['deprecatedMms3Url'],_0x157ffd[_0x1edfc2(0x12b)]=_0x157ffd[_0x1edfc2(0x13c)]['directPath'],_0x157ffd[_0x1edfc2(0x146)]=_0x157ffd[_0x1edfc2(0x13c)]['mimetype'],_0x157ffd['filehash']=_0x157ffd[_0x1edfc2(0x13c)][_0x1edfc2(0x171)],_0x157ffd[_0x1edfc2(0x179)]=_0x157ffd[_0x1edfc2(0x13c)][_0x1edfc2(0x179)],_0x157ffd[_0x1edfc2(0x15c)]=_0x157ffd[_0x1edfc2(0x13c)][_0x1edfc2(0x15c)]||![],_0x157ffd[_0x1edfc2(0x168)]=_0x157ffd[_0x1edfc2(0x13c)][_0x1edfc2(0x168)],_0x157ffd['height']=_0x157ffd[_0x1edfc2(0x13c)][_0x1edfc2(0x148)];if(_0x157ffd[_0x1edfc2(0x13c)]['mediaKeyTimestamp'])_0x157ffd['mediaKeyTimestamp']=_0x157ffd[_0x1edfc2(0x13c)][_0x1edfc2(0x173)];if(_0x157ffd[_0x1edfc2(0x13c)][_0x1edfc2(0x158)])_0x157ffd[_0x1edfc2(0x12d)]=_0x157ffd[_0x1edfc2(0x13c)][_0x1edfc2(0x158)];_0x157ffd[_0x1edfc2(0x13c)][_0x1edfc2(0x176)]&&(_0x157ffd[_0x1edfc2(0x176)]=_0x157ffd['_data'][_0x1edfc2(0x176)],_0x157ffd[_0x1edfc2(0x142)]=_0x157ffd[_0x1edfc2(0x13c)][_0x1edfc2(0x142)]||'');if(_0x157ffd['_data'][_0x1edfc2(0x136)])_0x157ffd[_0x1edfc2(0x136)]=_0x157ffd['_data'][_0x1edfc2(0x136)];if(_0x157ffd[_0x1edfc2(0x13c)][_0x1edfc2(0x16d)])_0x157ffd[_0x1edfc2(0x16d)]=_0x157ffd[_0x1edfc2(0x13c)][_0x1edfc2(0x16d)];if(_0x157ffd[_0x1edfc2(0x13c)][_0x1edfc2(0x157)])_0x157ffd[_0x1edfc2(0x157)]=_0x157ffd['_data']['thumbnailHeight'];if(_0x157ffd['_data']['isAnimated'])_0x157ffd[_0x1edfc2(0x13f)]=_0x157ffd[_0x1edfc2(0x13c)]['isAnimated'];}_0x157ffd['isGroup']&&(_0x157ffd[_0x1edfc2(0x15f)]=await await _0x5078f6['groupMetadata'](_0x157ffd[_0x1edfc2(0x15e)]),_0x157ffd[_0x1edfc2(0x126)]=_0x157ffd[_0x1edfc2(0x15f)][_0x1edfc2(0x14f)][_0x1edfc2(0x140)](_0x29dc04=>_0x29dc04['isAdmin']||_0x29dc04[_0x1edfc2(0x13d)]),_0x157ffd[_0x1edfc2(0x177)]=!!_0x157ffd[_0x1edfc2(0x126)][_0x1edfc2(0x174)](_0x29a73b=>(typeof _0x29a73b['id']==='object'&&_0x29a73b['id']!==undefined?_0x29a73b['id']['_serialized']:_0x29a73b['id'])===_0x157ffd['sender']),_0x157ffd[_0x1edfc2(0x17e)]=!!_0x157ffd[_0x1edfc2(0x126)]['find'](_0x3bb3f0=>(typeof _0x3bb3f0['id']===_0x1edfc2(0x131)&&_0x3bb3f0['id']!==undefined?_0x3bb3f0['id'][_0x1edfc2(0x163)]:_0x3bb3f0['id'])===_0x157ffd[_0x1edfc2(0x129)]));_0x157ffd[_0x1edfc2(0x137)]=_0x157ffd?.['selectedButtonId']||_0x157ffd?.[_0x1edfc2(0x125)]||_0x157ffd?.[_0x1edfc2(0x13c)]?.['caption']||_0x157ffd?.['_data']?.[_0x1edfc2(0x137)]||_0x157ffd?.[_0x1edfc2(0x137)]||'',_0x157ffd[_0x1edfc2(0x16b)]=_0x157ffd?.[_0x1edfc2(0x137)]?.[_0x1edfc2(0x133)]()?.[_0x1edfc2(0x128)](/ +/)||[],_0x157ffd['args']=_0x157ffd?.[_0x1edfc2(0x137)]?.['trim']()?.[_0x1edfc2(0x128)](/ +/)?.['slice'](0x1)||[],_0x157ffd[_0x1edfc2(0x164)]=_0x157ffd?.[_0x1edfc2(0x12e)]?.['join']('\x20');if(_0x157ffd[_0x1edfc2(0x154)])_0x157ffd[_0x1edfc2(0x17b)]=_0x567955=>{const _0x40f5e=_0x1edfc2;if(_0x567955)return _0x5078f6[_0x40f5e(0x15a)](_0x157ffd,_0x567955);else return _0x5078f6[_0x40f5e(0x169)](_0x157ffd);};_0x157ffd['resend']=()=>_0x5078f6['forwardMessage'](_0x157ffd[_0x1edfc2(0x15e)],_0x157ffd[_0x1edfc2(0x163)]),_0x157ffd[_0x1edfc2(0x12a)]=(_0xac6777,_0x2e9fe6={})=>_0x5078f6['sendMessage'](_0x2e9fe6[_0x1edfc2(0x15e)]?_0x2e9fe6['from']:_0x157ffd[_0x1edfc2(0x15e)],_0xac6777,{'quoted':_0x157ffd,..._0x2e9fe6}),_0x157ffd['error']=(_0x4a68b6,_0x3c0957,_0x3e423e={})=>_0x5078f6[_0x1edfc2(0x17f)](_0x4a68b6,_0x3c0957,{'quoted':_0x157ffd,..._0x3e423e});if(!_0x157ffd[_0x1edfc2(0x161)])delete _0x157ffd[_0x1edfc2(0x161)];if(!_0x157ffd[_0x1edfc2(0x149)])delete _0x157ffd[_0x1edfc2(0x149)];if(!_0x157ffd['isForwarded'])delete _0x157ffd[_0x1edfc2(0x145)];if(_0x157ffd[_0x1edfc2(0x150)]===0x0)delete _0x157ffd[_0x1edfc2(0x150)];if(_0x157ffd[_0x1edfc2(0x166)]['length']===0x0)delete _0x157ffd[_0x1edfc2(0x166)];if(!_0x157ffd['inviteV4'])delete _0x157ffd['inviteV4'];if(!_0x157ffd[_0x1edfc2(0x121)])delete _0x157ffd[_0x1edfc2(0x121)];if(!_0x157ffd[_0x1edfc2(0x15b)])delete _0x157ffd[_0x1edfc2(0x15b)];!_0x157ffd[_0x1edfc2(0x127)]&&(delete _0x157ffd['duration'],delete _0x157ffd[_0x1edfc2(0x152)]);!_0x157ffd[_0x1edfc2(0x17a)]&&(delete _0x157ffd['isEphemeral'],delete _0x157ffd['ephemeralDuration']);delete _0x157ffd[_0x1edfc2(0x13c)],delete _0x157ffd[_0x1edfc2(0x162)],delete _0x157ffd[_0x1edfc2(0x138)];if(_0x157ffd[_0x1edfc2(0x12f)]){let _0x48471e=await _0x157ffd[_0x1edfc2(0x141)]()||{};_0x157ffd[_0x1edfc2(0x155)]=await await smsg(_0x5078f6,_0x48471e),delete _0x48471e['_data'];}return await await _0x157ffd;};





export { client, smsg }