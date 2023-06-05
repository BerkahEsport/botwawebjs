import { Client as _Client } from "whatsapp-web.js"
import '../handler.js'
import fs from 'fs';
import { fileURLToPath } from "node:url"
import path from 'node:path'
import func from "./func.js"
import { extension } from "mime-types"
import {MessageMedia} from 'whatsapp-web.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

class client extends _Client {
                /**
             * Mengirim teks
             * @param {String} jid
             * @param {String} teks
             * @param {String} footer
             */
    async reply(jid , teks, footer = '') {
        let m;
        try {
            m = conn.sendMessage(jid, teks);
        } catch (e) {
            m = conn.sendMessage(jid, `${e}`);
        }
    }
            /**
             * Mengirim hasil dari JSON menjadi teks)
             * @param {String} jid
             * @param {String} link
             */
    async json(jid ,link) {
        let json = JSON.stringify(link)
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
            return await (await serialize(this, messages));
        }
        return null;
    }



}

// Ambil dan diperbaiki lagi agar tidak error dari mywajs.
(function(_0x543d1f,_0x4937e7){const _0x41d001=_0x55b3,_0x4ada79=_0x543d1f();while(!![]){try{const _0x58603b=parseInt(_0x41d001(0x190))/0x1+-parseInt(_0x41d001(0x18c))/0x2+-parseInt(_0x41d001(0x151))/0x3+parseInt(_0x41d001(0x17d))/0x4*(parseInt(_0x41d001(0x164))/0x5)+parseInt(_0x41d001(0x184))/0x6+-parseInt(_0x41d001(0x187))/0x7+-parseInt(_0x41d001(0x150))/0x8;if(_0x58603b===_0x4937e7)break;else _0x4ada79['push'](_0x4ada79['shift']());}catch(_0x5da851){_0x4ada79['push'](_0x4ada79['shift']());}}}(_0x176b,0x99e9c));function _0x55b3(_0x1073c4,_0x3dba0a){const _0x176b94=_0x176b();return _0x55b3=function(_0x55b365,_0x3aee93){_0x55b365=_0x55b365-0x14b;let _0x58cc24=_0x176b94[_0x55b365];return _0x58cc24;},_0x55b3(_0x1073c4,_0x3dba0a);}function _0x176b(){const _0x41e50a=['arg','github','find','author','isForwarded','length','error','thumbnailWidth','replace','g.us','isGroup','endsWith','encFilehash','wid','isBot','isEphemeral','size','isSuperAdmin','metadata','duration','forwardMessage','4053024puBVWw','707901iNWdZt','from','args','sender','forwardingScore','thumbnailHeight','trim','mediaKeyTimestamp','inviteV4','groupMetadata','width','selectedRowId','isStatus','deprecatedMms3Url','token','pushName','map','mimetype','mentionedIds','1076545GdXEMz','participants','isViewOnce','fileSize','directPath','sendMessage','_serialized','_data','participant','hasMedia','join','getQuotedMessage','object','split','startsWith','remote','resend','isAnimated','isBotAdmin','mentionedJidList','height','downloadMediaMessage','wavefrom','groupAdmins','info','20qtkPcl','isAdmin','mime','owner','isMedia','isNewMsg','reply','5136606PbdJeN','BAE5','notifyName','7863338GCKAHF','vCards','orderId','isGif','filehash','793548JnkqTg','isOwner','mediaKey','https://github.com/BerkahEsport/botwawebjs','960485hQnRHb','downloadAndSaveMediaMessage','body','botNumber','caption'];_0x176b=function(){return _0x41e50a;};return _0x176b();}const serialize=async(_0x7e7517,_0x51295a)=>{const _0x59f290=_0x55b3;if(!_0x51295a)return;_0x51295a?.[_0x59f290(0x16b)]?.['id']&&(_0x51295a['id']={'remote':_0x51295a[_0x59f290(0x16b)]['id'][_0x59f290(0x173)]||_0x51295a[_0x59f290(0x16b)]['to'],'participant':typeof _0x51295a[_0x59f290(0x16b)][_0x59f290(0x198)]===_0x59f290(0x170)&&_0x51295a[_0x59f290(0x16b)][_0x59f290(0x198)]!==null?_0x51295a[_0x59f290(0x16b)][_0x59f290(0x198)][_0x59f290(0x16a)]:_0x51295a[_0x59f290(0x16b)][_0x59f290(0x198)],'fromMe':_0x51295a[_0x59f290(0x16b)]['id']['fromMe'],'id':_0x51295a[_0x59f290(0x16b)]['id']['id'],'_serialized':_0x51295a[_0x59f290(0x16b)]['id'][_0x59f290(0x16a)]});_0x51295a[_0x59f290(0x196)]=_0x59f290(0x18f),_0x51295a[_0x59f290(0x152)]=_0x51295a['id'][_0x59f290(0x173)],_0x51295a[_0x59f290(0x154)]=_0x51295a['id'][_0x59f290(0x16c)]||_0x51295a[_0x59f290(0x16b)][_0x59f290(0x152)][_0x59f290(0x16a)]||_0x51295a[_0x59f290(0x16b)][_0x59f290(0x152)]||_0x51295a[_0x59f290(0x152)],_0x51295a[_0x59f290(0x19f)]=_0x51295a[_0x59f290(0x152)][_0x59f290(0x1a0)](_0x59f290(0x19e))||![],_0x51295a[_0x59f290(0x18d)]=[...global[_0x59f290(0x180)][_0x59f290(0x161)](([_0x4d8598])=>_0x4d8598)]['map'](_0x3d9d25=>_0x3d9d25?.[_0x59f290(0x19d)](/[^0-9]/g,''))['includes'](_0x51295a[_0x59f290(0x154)][_0x59f290(0x171)]('@')[0x0]),_0x51295a[_0x59f290(0x160)]=_0x51295a[_0x59f290(0x16b)][_0x59f290(0x186)],_0x51295a[_0x59f290(0x1a3)]=_0x51295a['id']?.['id']?.[_0x59f290(0x172)]('3EB0')||_0x51295a['id']?.['id']?.['startsWith'](_0x59f290(0x185))||![];if(_0x7e7517[_0x59f290(0x17c)])_0x51295a['botNumber']=_0x7e7517[_0x59f290(0x17c)]['me']['_serialized']||_0x7e7517['info'][_0x59f290(0x1a2)][_0x59f290(0x16a)];_0x51295a['mentions']=Array['isArray'](_0x51295a[_0x59f290(0x16b)][_0x59f290(0x177)])&&_0x51295a[_0x59f290(0x16b)]['mentionedJidList'][_0x59f290(0x19a)]!==0x0?_0x51295a[_0x59f290(0x16b)]['mentionedJidList'][_0x59f290(0x161)](_0x513652=>_0x513652[_0x59f290(0x16a)]):[],_0x51295a['_serialized']=_0x51295a['id'][_0x59f290(0x16a)],_0x51295a[_0x59f290(0x181)]=_0x51295a[_0x59f290(0x16d)],_0x51295a[_0x59f290(0x182)]=_0x51295a[_0x59f290(0x16b)]['isNewMsg'],_0x51295a['ephemeralDuration']=_0x51295a[_0x59f290(0x16b)]['ephemeralDuration']||0x0;if(_0x51295a['isMedia']){_0x51295a[_0x59f290(0x15e)]=_0x51295a[_0x59f290(0x16b)][_0x59f290(0x15e)],_0x51295a[_0x59f290(0x168)]=_0x51295a[_0x59f290(0x16b)][_0x59f290(0x168)],_0x51295a[_0x59f290(0x17f)]=_0x51295a['_data'][_0x59f290(0x162)],_0x51295a[_0x59f290(0x18b)]=_0x51295a['_data'][_0x59f290(0x18b)],_0x51295a['encFilehash']=_0x51295a[_0x59f290(0x16b)][_0x59f290(0x1a1)],_0x51295a[_0x59f290(0x18e)]=_0x51295a[_0x59f290(0x16b)][_0x59f290(0x18e)]||![],_0x51295a[_0x59f290(0x15b)]=_0x51295a[_0x59f290(0x16b)][_0x59f290(0x15b)],_0x51295a['height']=_0x51295a[_0x59f290(0x16b)][_0x59f290(0x178)];if(_0x51295a[_0x59f290(0x16b)][_0x59f290(0x158)])_0x51295a['mediaKeyTimestamp']=_0x51295a['_data']['mediaKeyTimestamp'];if(_0x51295a[_0x59f290(0x16b)][_0x59f290(0x14b)])_0x51295a[_0x59f290(0x167)]=_0x51295a[_0x59f290(0x16b)]['size'];_0x51295a[_0x59f290(0x16b)][_0x59f290(0x166)]&&(_0x51295a['isViewOnce']=_0x51295a[_0x59f290(0x16b)][_0x59f290(0x166)],_0x51295a[_0x59f290(0x194)]=_0x51295a[_0x59f290(0x16b)][_0x59f290(0x194)]||'');if(_0x51295a['_data'][_0x59f290(0x17a)])_0x51295a[_0x59f290(0x17a)]=_0x51295a[_0x59f290(0x16b)]['wavefrom'];if(_0x51295a[_0x59f290(0x16b)]['thumbnailWidth'])_0x51295a[_0x59f290(0x19c)]=_0x51295a[_0x59f290(0x16b)][_0x59f290(0x19c)];if(_0x51295a[_0x59f290(0x16b)]['thumbnailHeight'])_0x51295a[_0x59f290(0x156)]=_0x51295a['_data'][_0x59f290(0x156)];if(_0x51295a[_0x59f290(0x16b)][_0x59f290(0x175)])_0x51295a[_0x59f290(0x175)]=_0x51295a[_0x59f290(0x16b)][_0x59f290(0x175)];}_0x51295a['isGroup']&&(_0x51295a[_0x59f290(0x14d)]=await await _0x7e7517[_0x59f290(0x15a)](_0x51295a[_0x59f290(0x152)]),_0x51295a[_0x59f290(0x17b)]=_0x51295a[_0x59f290(0x14d)][_0x59f290(0x165)]['filter'](_0x14767c=>_0x14767c[_0x59f290(0x17e)]||_0x14767c[_0x59f290(0x14c)]),_0x51295a[_0x59f290(0x17e)]=!!_0x51295a['groupAdmins'][_0x59f290(0x197)](_0x2a86ef=>(typeof _0x2a86ef['id']==='object'&&_0x2a86ef['id']!==undefined?_0x2a86ef['id'][_0x59f290(0x16a)]:_0x2a86ef['id'])===_0x51295a[_0x59f290(0x154)]),_0x51295a[_0x59f290(0x176)]=!!_0x51295a[_0x59f290(0x17b)][_0x59f290(0x197)](_0x5252d5=>(typeof _0x5252d5['id']===_0x59f290(0x170)&&_0x5252d5['id']!==undefined?_0x5252d5['id'][_0x59f290(0x16a)]:_0x5252d5['id'])===_0x51295a[_0x59f290(0x193)]));_0x51295a[_0x59f290(0x192)]=_0x51295a?.['selectedButtonId']||_0x51295a?.[_0x59f290(0x15c)]||_0x51295a?.[_0x59f290(0x16b)]?.[_0x59f290(0x194)]||_0x51295a?.[_0x59f290(0x16b)]?.['body']||_0x51295a?.[_0x59f290(0x192)]||'',_0x51295a[_0x59f290(0x195)]=_0x51295a?.[_0x59f290(0x192)]?.[_0x59f290(0x157)]()?.['split'](/ +/)||[],_0x51295a[_0x59f290(0x153)]=_0x51295a?.['body']?.['trim']()?.['split'](/ +/)?.['slice'](0x1)||[],_0x51295a['text']=_0x51295a?.[_0x59f290(0x153)]?.[_0x59f290(0x16e)]('\x20');if(_0x51295a[_0x59f290(0x181)])_0x51295a['downloadMedia']=_0x5576e1=>{const _0x55764c=_0x59f290;if(_0x5576e1)return _0x7e7517[_0x55764c(0x191)](_0x51295a,_0x5576e1);else return _0x7e7517[_0x55764c(0x179)](_0x51295a);};_0x51295a[_0x59f290(0x174)]=()=>_0x7e7517[_0x59f290(0x14f)](_0x51295a['from'],_0x51295a['_serialized']),_0x51295a[_0x59f290(0x183)]=(_0xdb1b8f,_0x183972={})=>_0x7e7517['sendMessage'](_0x183972['from']?_0x183972[_0x59f290(0x152)]:_0x51295a[_0x59f290(0x152)],_0xdb1b8f,{'quoted':_0x51295a,..._0x183972}),_0x51295a[_0x59f290(0x19b)]=(_0x21343d,_0x3029d0,_0x32679c={})=>_0x7e7517[_0x59f290(0x169)](_0x21343d,_0x3029d0,{'quoted':_0x51295a,..._0x32679c});if(!_0x51295a[_0x59f290(0x198)])delete _0x51295a['author'];if(!_0x51295a[_0x59f290(0x15d)])delete _0x51295a[_0x59f290(0x15d)];if(!_0x51295a[_0x59f290(0x199)])delete _0x51295a['isForwarded'];if(_0x51295a[_0x59f290(0x155)]===0x0)delete _0x51295a[_0x59f290(0x155)];if(_0x51295a[_0x59f290(0x188)][_0x59f290(0x19a)]===0x0)delete _0x51295a[_0x59f290(0x188)];if(!_0x51295a[_0x59f290(0x159)])delete _0x51295a['inviteV4'];if(!_0x51295a[_0x59f290(0x189)])delete _0x51295a[_0x59f290(0x189)];if(!_0x51295a[_0x59f290(0x15f)])delete _0x51295a[_0x59f290(0x15f)];!_0x51295a['hasMedia']&&(delete _0x51295a[_0x59f290(0x14e)],delete _0x51295a[_0x59f290(0x18a)]);!_0x51295a[_0x59f290(0x1a4)]&&(delete _0x51295a['isEphemeral'],delete _0x51295a['ephemeralDuration']);delete _0x51295a['_data'],delete _0x51295a[_0x59f290(0x163)],delete _0x51295a['location'];if(_0x51295a['hasQuotedMsg']){let _0x508bec=await _0x51295a[_0x59f290(0x16f)]()||{};_0x51295a['quoted']=await await serialize(_0x7e7517,_0x508bec),delete _0x508bec[_0x59f290(0x16b)];}return await await _0x51295a;};





export { client, serialize }
