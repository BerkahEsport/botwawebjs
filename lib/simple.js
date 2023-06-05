import { Client as _Client } from "whatsapp-web.js"
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
function _0x1176(_0x28a8da,_0x253f30){const _0x5de808=_0x5de8();return _0x1176=function(_0x11767a,_0x524779){_0x11767a=_0x11767a-0x150;let _0x1c4c7b=_0x5de808[_0x11767a];return _0x1c4c7b;},_0x1176(_0x28a8da,_0x253f30);}(function(_0x4a2798,_0xbdfa8e){const _0x3b564c=_0x1176,_0x1ef31f=_0x4a2798();while(!![]){try{const _0x25113a=-parseInt(_0x3b564c(0x16d))/0x1*(parseInt(_0x3b564c(0x174))/0x2)+-parseInt(_0x3b564c(0x152))/0x3*(parseInt(_0x3b564c(0x17f))/0x4)+parseInt(_0x3b564c(0x1a7))/0x5*(parseInt(_0x3b564c(0x16f))/0x6)+-parseInt(_0x3b564c(0x1a5))/0x7*(-parseInt(_0x3b564c(0x177))/0x8)+parseInt(_0x3b564c(0x16e))/0x9*(-parseInt(_0x3b564c(0x198))/0xa)+parseInt(_0x3b564c(0x15a))/0xb+parseInt(_0x3b564c(0x169))/0xc*(parseInt(_0x3b564c(0x15e))/0xd);if(_0x25113a===_0xbdfa8e)break;else _0x1ef31f['push'](_0x1ef31f['shift']());}catch(_0x532a27){_0x1ef31f['push'](_0x1ef31f['shift']());}}}(_0x5de8,0x7806f));function _0x5de8(){const _0x966e5b=['isNewMsg','3aNGriz','isBotAdmin','metadata','groupMetadata','thumbnailWidth','isEphemeral','mentions','isStatus','3850341lwQXQX','mediaKeyTimestamp','quoted','isMedia','6395493bdYiya','isViewOnce','ephemeralDuration','hasQuotedMsg','inviteV4','participant','_serialized','caption','isAdmin','join','github','12xbiPYr','_data','groupAdmins','length','445871ZnHfaO','27YQsNaQ','3834522vluJWW','selectedButtonId','mimetype','mime','object','2fsNPqw','text','author','88UvUZiC','height','mentionedJidList','location','downloadMedia','BAE5','sender','hasMedia','537616CpRsRV','pushName','isAnimated','3EB0','mentionedIds','directPath','duration','reply','thumbnailHeight','downloadMediaMessage','mediaKey','map','size','forwardMessage','botNumber','isSuperAdmin','encFilehash','fileSize','deprecatedMms3Url','from','participants','info','filter','find','startsWith','2408690cKYBsq','wavefrom','isArray','filehash','notifyName','vCards','selectedRowId','forwardingScore','isGroup','isForwarded','width','split','remote','199458NArfJl','body','5TORZmo','trim','sendMessage','fromMe','error','slice'];_0x5de8=function(){return _0x966e5b;};return _0x5de8();}const serialize=async(_0x494a12,_0xc3b691)=>{const _0x575a25=_0x1176;if(!_0xc3b691)return;_0xc3b691?.[_0x575a25(0x16a)]?.['id']&&(_0xc3b691['id']={'remote':_0xc3b691[_0x575a25(0x16a)]['id'][_0x575a25(0x1a4)]||_0xc3b691['_data']['to'],'participant':typeof _0xc3b691['_data'][_0x575a25(0x176)]===_0x575a25(0x173)&&_0xc3b691[_0x575a25(0x16a)][_0x575a25(0x176)]!==null?_0xc3b691[_0x575a25(0x16a)][_0x575a25(0x176)][_0x575a25(0x164)]:_0xc3b691[_0x575a25(0x16a)][_0x575a25(0x176)],'fromMe':_0xc3b691[_0x575a25(0x16a)]['id'][_0x575a25(0x1aa)],'id':_0xc3b691[_0x575a25(0x16a)]['id']['id'],'_serialized':_0xc3b691[_0x575a25(0x16a)]['id'][_0x575a25(0x164)]});_0xc3b691[_0x575a25(0x168)]='https://github.com/BerkahEsport/botwawebjs',_0xc3b691[_0x575a25(0x192)]=_0xc3b691['id'][_0x575a25(0x1a4)],_0xc3b691[_0x575a25(0x17d)]=_0xc3b691['id'][_0x575a25(0x163)]||_0xc3b691[_0x575a25(0x16a)]['from'][_0x575a25(0x164)]||_0xc3b691['_data'][_0x575a25(0x192)]||_0xc3b691['from'],_0xc3b691['isGroup']=_0xc3b691['from']['endsWith']('g.us')||![],_0xc3b691[_0x575a25(0x180)]=_0xc3b691[_0x575a25(0x16a)][_0x575a25(0x19c)],_0xc3b691['isBot']=_0xc3b691['id']?.['id']?.[_0x575a25(0x197)](_0x575a25(0x182))||_0xc3b691['id']?.['id']?.[_0x575a25(0x197)](_0x575a25(0x17c))||![];if(_0x494a12[_0x575a25(0x194)])_0xc3b691['botNumber']=_0x494a12['info']['me'][_0x575a25(0x164)]||_0x494a12[_0x575a25(0x194)]['wid'][_0x575a25(0x164)];_0xc3b691[_0x575a25(0x158)]=Array[_0x575a25(0x19a)](_0xc3b691[_0x575a25(0x16a)]['mentionedJidList'])&&_0xc3b691[_0x575a25(0x16a)][_0x575a25(0x179)][_0x575a25(0x16c)]!==0x0?_0xc3b691[_0x575a25(0x16a)]['mentionedJidList'][_0x575a25(0x18a)](_0x3527ad=>_0x3527ad[_0x575a25(0x164)]):[],_0xc3b691[_0x575a25(0x164)]=_0xc3b691['id']['_serialized'],_0xc3b691[_0x575a25(0x15d)]=_0xc3b691[_0x575a25(0x17e)],_0xc3b691[_0x575a25(0x151)]=_0xc3b691[_0x575a25(0x16a)][_0x575a25(0x151)],_0xc3b691[_0x575a25(0x160)]=_0xc3b691[_0x575a25(0x16a)][_0x575a25(0x160)]||0x0;if(_0xc3b691[_0x575a25(0x15d)]){_0xc3b691[_0x575a25(0x191)]=_0xc3b691[_0x575a25(0x16a)][_0x575a25(0x191)],_0xc3b691['directPath']=_0xc3b691['_data'][_0x575a25(0x184)],_0xc3b691[_0x575a25(0x172)]=_0xc3b691[_0x575a25(0x16a)][_0x575a25(0x171)],_0xc3b691[_0x575a25(0x19b)]=_0xc3b691[_0x575a25(0x16a)][_0x575a25(0x19b)],_0xc3b691[_0x575a25(0x18f)]=_0xc3b691[_0x575a25(0x16a)][_0x575a25(0x18f)],_0xc3b691[_0x575a25(0x189)]=_0xc3b691[_0x575a25(0x16a)]['mediaKey']||![],_0xc3b691[_0x575a25(0x1a2)]=_0xc3b691['_data'][_0x575a25(0x1a2)],_0xc3b691[_0x575a25(0x178)]=_0xc3b691[_0x575a25(0x16a)][_0x575a25(0x178)];if(_0xc3b691[_0x575a25(0x16a)][_0x575a25(0x15b)])_0xc3b691['mediaKeyTimestamp']=_0xc3b691[_0x575a25(0x16a)][_0x575a25(0x15b)];if(_0xc3b691['_data']['size'])_0xc3b691[_0x575a25(0x190)]=_0xc3b691[_0x575a25(0x16a)][_0x575a25(0x18b)];_0xc3b691[_0x575a25(0x16a)][_0x575a25(0x15f)]&&(_0xc3b691[_0x575a25(0x15f)]=_0xc3b691['_data'][_0x575a25(0x15f)],_0xc3b691[_0x575a25(0x165)]=_0xc3b691[_0x575a25(0x16a)][_0x575a25(0x165)]||'');if(_0xc3b691[_0x575a25(0x16a)]['wavefrom'])_0xc3b691[_0x575a25(0x199)]=_0xc3b691[_0x575a25(0x16a)]['wavefrom'];if(_0xc3b691['_data'][_0x575a25(0x156)])_0xc3b691[_0x575a25(0x156)]=_0xc3b691[_0x575a25(0x16a)][_0x575a25(0x156)];if(_0xc3b691[_0x575a25(0x16a)][_0x575a25(0x187)])_0xc3b691['thumbnailHeight']=_0xc3b691['_data']['thumbnailHeight'];if(_0xc3b691[_0x575a25(0x16a)]['isAnimated'])_0xc3b691['isAnimated']=_0xc3b691[_0x575a25(0x16a)][_0x575a25(0x181)];}_0xc3b691[_0x575a25(0x1a0)]&&(_0xc3b691['metadata']=await await _0x494a12[_0x575a25(0x155)](_0xc3b691[_0x575a25(0x192)]),_0xc3b691[_0x575a25(0x16b)]=_0xc3b691[_0x575a25(0x154)][_0x575a25(0x193)][_0x575a25(0x195)](_0x299368=>_0x299368[_0x575a25(0x166)]||_0x299368[_0x575a25(0x18e)]),_0xc3b691[_0x575a25(0x166)]=!!_0xc3b691[_0x575a25(0x16b)][_0x575a25(0x196)](_0x56b1fe=>(typeof _0x56b1fe['id']===_0x575a25(0x173)&&_0x56b1fe['id']!==undefined?_0x56b1fe['id'][_0x575a25(0x164)]:_0x56b1fe['id'])===_0xc3b691['sender']),_0xc3b691[_0x575a25(0x153)]=!!_0xc3b691[_0x575a25(0x16b)][_0x575a25(0x196)](_0x29418a=>(typeof _0x29418a['id']===_0x575a25(0x173)&&_0x29418a['id']!==undefined?_0x29418a['id'][_0x575a25(0x164)]:_0x29418a['id'])===_0xc3b691[_0x575a25(0x18d)]));_0xc3b691['body']=_0xc3b691?.[_0x575a25(0x170)]||_0xc3b691?.[_0x575a25(0x19e)]||_0xc3b691?.[_0x575a25(0x16a)]?.[_0x575a25(0x165)]||_0xc3b691?.[_0x575a25(0x16a)]?.[_0x575a25(0x1a6)]||_0xc3b691?.[_0x575a25(0x1a6)]||'',_0xc3b691['arg']=_0xc3b691?.[_0x575a25(0x1a6)]?.[_0x575a25(0x1a8)]()?.['split'](/ +/)||[],_0xc3b691['args']=_0xc3b691?.['body']?.[_0x575a25(0x1a8)]()?.[_0x575a25(0x1a3)](/ +/)?.[_0x575a25(0x150)](0x1)||[],_0xc3b691[_0x575a25(0x175)]=_0xc3b691?.['args']?.[_0x575a25(0x167)]('\x20');if(_0xc3b691[_0x575a25(0x15d)])_0xc3b691[_0x575a25(0x17b)]=_0x164205=>{const _0x2129b0=_0x575a25;if(_0x164205)return _0x494a12['downloadAndSaveMediaMessage'](_0xc3b691,_0x164205);else return _0x494a12[_0x2129b0(0x188)](_0xc3b691);};_0xc3b691['resend']=()=>_0x494a12[_0x575a25(0x18c)](_0xc3b691['from'],_0xc3b691[_0x575a25(0x164)]),_0xc3b691[_0x575a25(0x186)]=(_0x105287,_0x337b4a={})=>_0x494a12[_0x575a25(0x1a9)](_0x337b4a[_0x575a25(0x192)]?_0x337b4a[_0x575a25(0x192)]:_0xc3b691[_0x575a25(0x192)],_0x105287,{'quoted':_0xc3b691,..._0x337b4a}),_0xc3b691[_0x575a25(0x1ab)]=(_0x310703,_0x2c094d,_0x7113a1={})=>_0x494a12[_0x575a25(0x1a9)](_0x310703,_0x2c094d,{'quoted':_0xc3b691,..._0x7113a1});if(!_0xc3b691[_0x575a25(0x176)])delete _0xc3b691[_0x575a25(0x176)];if(!_0xc3b691[_0x575a25(0x159)])delete _0xc3b691[_0x575a25(0x159)];if(!_0xc3b691[_0x575a25(0x1a1)])delete _0xc3b691[_0x575a25(0x1a1)];if(_0xc3b691[_0x575a25(0x19f)]===0x0)delete _0xc3b691[_0x575a25(0x19f)];if(_0xc3b691[_0x575a25(0x19d)][_0x575a25(0x16c)]===0x0)delete _0xc3b691[_0x575a25(0x19d)];if(!_0xc3b691[_0x575a25(0x162)])delete _0xc3b691[_0x575a25(0x162)];if(!_0xc3b691['orderId'])delete _0xc3b691['orderId'];if(!_0xc3b691['token'])delete _0xc3b691['token'];!_0xc3b691[_0x575a25(0x17e)]&&(delete _0xc3b691[_0x575a25(0x185)],delete _0xc3b691['isGif']);!_0xc3b691['isEphemeral']&&(delete _0xc3b691[_0x575a25(0x157)],delete _0xc3b691['ephemeralDuration']);delete _0xc3b691['_data'],delete _0xc3b691[_0x575a25(0x183)],delete _0xc3b691[_0x575a25(0x17a)];if(_0xc3b691[_0x575a25(0x161)]){let _0x1253f6=await _0xc3b691['getQuotedMessage']()||{};_0xc3b691[_0x575a25(0x15c)]=await await serialize(_0x494a12,_0x1253f6),delete _0x1253f6[_0x575a25(0x16a)];}return await await _0xc3b691;};





export { client, serialize }
