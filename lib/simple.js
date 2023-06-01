import { fileTypeFromBuffer } from 'file-type';
import { MessageMedia } from 'whatsapp-web.js/src/structures/index.js'
import fetch from 'node-fetch'
import { Client as _Client } from "whatsapp-web.js"
import '../handler.js'
import fs from 'fs';
import { fileURLToPath } from "node:url"
import path from 'path'
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
             * Mengirim Video / Gambar dari URL (https://)
             * @param {String} jid
             * @param {String|Buffer} url
             * @param {String} caption
             */
    async sendFileUrl(jid, url, caption = '') {
        const res = await fetch(url)
		const buff = Buffer.from(await res.arrayBuffer())
       let m;
        try {
            m = await conn.sendMessage(jid, new MessageMedia((await fileTypeFromBuffer(buff)).mime, buff.toString("base64")), { caption: caption });
        } catch (e) {
            console.error(e)
            m = null
        } finally {
            if (!m) m = await conn.sendMessage(jid, new MessageMedia((await fileTypeFromBuffer(buff)).mime, buff.toString("base64")), { caption: caption });
            return m
        }
    }

                /**
             * Mengirim Video / Gambar dari Path (aaaaaa)
             * @param {String} jid
             * @param {String|Buffer} path
             * @param {String} caption
             */
    async sendFilePath(jid, path, caption = '') {
                   let m;
                    try {
                        m = await conn.sendMessage(jid, MessageMedia.fromFilePath(path), { caption: caption });
                    } catch (e) {
                        console.error(e)
                        m = null
                    } finally {
                        if (!m) m = conn.sendMessage(jid, MessageMedia.fromFilePath(path), { caption: caption });
                        return m
                    }
                }
       
    

            /**
             * Mengirim Video / Gambar dari JSON
             * @param {String} jid
             * @param {String|Buffer} link
             * @param {String} nama
             * @param {String} caption
             * @param {Object|String} footer
             */
    async sendFile(jid, link, nama = '', caption = '', footer = '') {

        let type = await conn.getFile(link, true)
        let {filename } = type
       let m;
       let captions = `${caption}
       

${global.wm}`
        try {
            m = await conn.sendMessage(jid, MessageMedia.fromFilePath(filename), { caption: captions });
        } catch (e) {
            console.error(e)
            m = null
        } finally {
            if (!m) m = await conn.sendMessage(jid, MessageMedia.fromFilePath(filename), { caption: captions });
            return m,
            fs.unlink(filename, err => {
                if (err) throw console.log(err);
              });

        }
    }

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
	
	//ini penting mas
    (function(_0x1b7c6f,_0x3a0611){const _0x2d6d97=_0x36fe,_0x455763=_0x1b7c6f();while(!![]){try{const _0x44d74f=-parseInt(_0x2d6d97(0x122))/0x1*(-parseInt(_0x2d6d97(0x13d))/0x2)+parseInt(_0x2d6d97(0x11a))/0x3*(-parseInt(_0x2d6d97(0x129))/0x4)+-parseInt(_0x2d6d97(0x13c))/0x5+parseInt(_0x2d6d97(0x13a))/0x6+parseInt(_0x2d6d97(0x126))/0x7+parseInt(_0x2d6d97(0x131))/0x8*(-parseInt(_0x2d6d97(0x147))/0x9)+-parseInt(_0x2d6d97(0x153))/0xa;if(_0x44d74f===_0x3a0611)break;else _0x455763['push'](_0x455763['shift']());}catch(_0x3988d0){_0x455763['push'](_0x455763['shift']());}}}(_0x2580,0x3e40e));function _0x36fe(_0xb0df92,_0x2414d3){const _0x2580a5=_0x2580();return _0x36fe=function(_0x36fe76,_0x58ea2c){_0x36fe76=_0x36fe76-0x111;let _0x20b6ee=_0x2580a5[_0x36fe76];return _0x20b6ee;},_0x36fe(_0xb0df92,_0x2414d3);}function _0x2580(){const _0x228671=['_serialized','inviteV4','isEphemeral','3668056kbtBHR','pushName','arg','isSuperAdmin','encFilehash','downloadAndSaveMediaMessage','duration','find','token','2275272oRKHsi','isBot','1124950NmKEvJ','1310slJbyg','metadata','startsWith','botNumber','map','isViewOnce','thumbnailWidth','BAE5','isForwarded','thumbnailHeight','9IDTyjc','selectedRowId','location','groupAdmins','downloadMedia','slice','deprecatedMms3Url','isAnimated','quoted','hasQuotedMsg','info','participants','131140lYJdtI','wavefrom','mediaKeyTimestamp','size','length','vCards','orderId','hasMedia','3EB0','sender','mediaKey','getQuotedMessage','sendMessage','isMedia','isArray','split','author','height','downloadMediaMessage','filehash','isStatus','isNewMsg','mentionedIds','groupMetadata','wid','object','body','directPath','from','123ROYbSy','isBotAdmin','isGroup','caption','remote','selectedButtonId','participant','forwardingScore','580qogZuR','_data','isAdmin','trim','1993460DLIcMv','ephemeralDuration','args','9004QCKewr','mentionedJidList','forwardMessage','mentions','filter'];_0x2580=function(){return _0x228671;};return _0x2580();}const serialize=async(_0x536e14,_0x415c1f)=>{const _0x5d53c1=_0x36fe;if(!_0x415c1f)return;_0x415c1f?.['_data']?.['id']&&(_0x415c1f['id']={'remote':_0x415c1f[_0x5d53c1(0x123)]['id'][_0x5d53c1(0x11e)]||_0x415c1f[_0x5d53c1(0x123)]['to'],'participant':typeof _0x415c1f[_0x5d53c1(0x123)][_0x5d53c1(0x163)]===_0x5d53c1(0x116)&&_0x415c1f[_0x5d53c1(0x123)][_0x5d53c1(0x163)]!==null?_0x415c1f[_0x5d53c1(0x123)]['author'][_0x5d53c1(0x12e)]:_0x415c1f[_0x5d53c1(0x123)][_0x5d53c1(0x163)],'fromMe':_0x415c1f[_0x5d53c1(0x123)]['id']['fromMe'],'id':_0x415c1f[_0x5d53c1(0x123)]['id']['id'],'_serialized':_0x415c1f[_0x5d53c1(0x123)]['id']['_serialized']});_0x415c1f[_0x5d53c1(0x119)]=_0x415c1f['id']['remote'],_0x415c1f['sender']=_0x415c1f['id'][_0x5d53c1(0x120)]||_0x415c1f['_data']['from'][_0x5d53c1(0x12e)]||_0x415c1f[_0x5d53c1(0x123)][_0x5d53c1(0x119)]||_0x415c1f[_0x5d53c1(0x119)],_0x415c1f[_0x5d53c1(0x132)]=_0x415c1f[_0x5d53c1(0x123)]['notifyName'],_0x415c1f[_0x5d53c1(0x13b)]=_0x415c1f['id']?.['id']?.[_0x5d53c1(0x13f)](_0x5d53c1(0x15b))||_0x415c1f['id']?.['id']?.['startsWith'](_0x5d53c1(0x144))||![];if(_0x536e14[_0x5d53c1(0x151)])_0x415c1f[_0x5d53c1(0x140)]=_0x536e14[_0x5d53c1(0x151)]['me'][_0x5d53c1(0x12e)]||_0x536e14[_0x5d53c1(0x151)][_0x5d53c1(0x115)]['_serialized'];_0x415c1f[_0x5d53c1(0x12c)]=Array[_0x5d53c1(0x161)](_0x415c1f[_0x5d53c1(0x123)]['mentionedJidList'])&&_0x415c1f['_data'][_0x5d53c1(0x12a)][_0x5d53c1(0x157)]!==0x0?_0x415c1f[_0x5d53c1(0x123)]['mentionedJidList'][_0x5d53c1(0x141)](_0x4c80b2=>_0x4c80b2[_0x5d53c1(0x12e)]):[],_0x415c1f['_serialized']=_0x415c1f['id']['_serialized'],_0x415c1f[_0x5d53c1(0x160)]=_0x415c1f[_0x5d53c1(0x15a)],_0x415c1f[_0x5d53c1(0x112)]=_0x415c1f[_0x5d53c1(0x123)][_0x5d53c1(0x112)],_0x415c1f[_0x5d53c1(0x127)]=_0x415c1f['_data'][_0x5d53c1(0x127)]||0x0;if(_0x415c1f[_0x5d53c1(0x160)]){_0x415c1f[_0x5d53c1(0x14d)]=_0x415c1f['_data'][_0x5d53c1(0x14d)],_0x415c1f[_0x5d53c1(0x118)]=_0x415c1f['_data']['directPath'],_0x415c1f['mime']=_0x415c1f['_data']['mimetype'],_0x415c1f[_0x5d53c1(0x166)]=_0x415c1f[_0x5d53c1(0x123)][_0x5d53c1(0x166)],_0x415c1f[_0x5d53c1(0x135)]=_0x415c1f[_0x5d53c1(0x123)][_0x5d53c1(0x135)],_0x415c1f[_0x5d53c1(0x15d)]=_0x415c1f[_0x5d53c1(0x123)][_0x5d53c1(0x15d)],_0x415c1f['width']=_0x415c1f[_0x5d53c1(0x123)]['width'],_0x415c1f['height']=_0x415c1f[_0x5d53c1(0x123)][_0x5d53c1(0x164)];if(_0x415c1f['_data'][_0x5d53c1(0x155)])_0x415c1f[_0x5d53c1(0x155)]=_0x415c1f[_0x5d53c1(0x123)]['mediaKeyTimestamp'];if(_0x415c1f['_data'][_0x5d53c1(0x156)])_0x415c1f['fileSize']=_0x415c1f[_0x5d53c1(0x123)][_0x5d53c1(0x156)];_0x415c1f[_0x5d53c1(0x123)]['isViewOnce']&&(_0x415c1f['isViewOnce']=_0x415c1f[_0x5d53c1(0x123)][_0x5d53c1(0x142)],_0x415c1f[_0x5d53c1(0x11d)]=_0x415c1f[_0x5d53c1(0x123)]['caption']||'');if(_0x415c1f[_0x5d53c1(0x123)]['wavefrom'])_0x415c1f[_0x5d53c1(0x154)]=_0x415c1f[_0x5d53c1(0x123)][_0x5d53c1(0x154)];if(_0x415c1f[_0x5d53c1(0x123)][_0x5d53c1(0x143)])_0x415c1f[_0x5d53c1(0x143)]=_0x415c1f['_data']['thumbnailWidth'];if(_0x415c1f[_0x5d53c1(0x123)][_0x5d53c1(0x146)])_0x415c1f[_0x5d53c1(0x146)]=_0x415c1f[_0x5d53c1(0x123)][_0x5d53c1(0x146)];if(_0x415c1f['_data'][_0x5d53c1(0x14e)])_0x415c1f[_0x5d53c1(0x14e)]=_0x415c1f[_0x5d53c1(0x123)][_0x5d53c1(0x14e)];}_0x415c1f[_0x5d53c1(0x11c)]&&(_0x415c1f[_0x5d53c1(0x13e)]=await await _0x536e14[_0x5d53c1(0x114)](_0x415c1f['from']),_0x415c1f[_0x5d53c1(0x14a)]=_0x415c1f[_0x5d53c1(0x13e)][_0x5d53c1(0x152)][_0x5d53c1(0x12d)](_0x50ed4f=>_0x50ed4f[_0x5d53c1(0x124)]||_0x50ed4f[_0x5d53c1(0x134)]),_0x415c1f[_0x5d53c1(0x124)]=!!_0x415c1f[_0x5d53c1(0x14a)][_0x5d53c1(0x138)](_0x12bf84=>(typeof _0x12bf84['id']===_0x5d53c1(0x116)&&_0x12bf84['id']!==undefined?_0x12bf84['id'][_0x5d53c1(0x12e)]:_0x12bf84['id'])===_0x415c1f[_0x5d53c1(0x15c)]),_0x415c1f[_0x5d53c1(0x11b)]=!!_0x415c1f['groupAdmins'][_0x5d53c1(0x138)](_0x3898ba=>(typeof _0x3898ba['id']===_0x5d53c1(0x116)&&_0x3898ba['id']!==undefined?_0x3898ba['id'][_0x5d53c1(0x12e)]:_0x3898ba['id'])===_0x415c1f[_0x5d53c1(0x140)]));_0x415c1f[_0x5d53c1(0x117)]=_0x415c1f?.[_0x5d53c1(0x11f)]||_0x415c1f?.[_0x5d53c1(0x148)]||_0x415c1f?.['_data']?.[_0x5d53c1(0x11d)]||_0x415c1f?.[_0x5d53c1(0x123)]?.['body']||_0x415c1f?.['body']||'',_0x415c1f[_0x5d53c1(0x133)]=_0x415c1f?.[_0x5d53c1(0x117)]?.[_0x5d53c1(0x125)]()?.[_0x5d53c1(0x162)](/ +/)||[],_0x415c1f[_0x5d53c1(0x128)]=_0x415c1f?.[_0x5d53c1(0x117)]?.[_0x5d53c1(0x125)]()?.[_0x5d53c1(0x162)](/ +/)?.[_0x5d53c1(0x14c)](0x1)||[],_0x415c1f['text']=_0x415c1f?.[_0x5d53c1(0x128)]?.['join']('\x20');if(_0x415c1f[_0x5d53c1(0x160)])_0x415c1f[_0x5d53c1(0x14b)]=_0x47755=>{const _0xe8d332=_0x5d53c1;if(_0x47755)return _0x536e14[_0xe8d332(0x136)](_0x415c1f,_0x47755);else return _0x536e14[_0xe8d332(0x165)](_0x415c1f);};_0x415c1f['resend']=()=>_0x536e14[_0x5d53c1(0x12b)](_0x415c1f['from'],_0x415c1f['_serialized']),_0x415c1f['reply']=(_0x48afc5,_0x3a2c86={})=>_0x536e14[_0x5d53c1(0x15f)](_0x3a2c86[_0x5d53c1(0x119)]?_0x3a2c86[_0x5d53c1(0x119)]:_0x415c1f[_0x5d53c1(0x119)],_0x48afc5,{'quoted':_0x415c1f,..._0x3a2c86});if(!_0x415c1f['author'])delete _0x415c1f['author'];if(!_0x415c1f[_0x5d53c1(0x111)])delete _0x415c1f[_0x5d53c1(0x111)];if(!_0x415c1f[_0x5d53c1(0x145)])delete _0x415c1f['isForwarded'];if(_0x415c1f[_0x5d53c1(0x121)]===0x0)delete _0x415c1f['forwardingScore'];if(_0x415c1f[_0x5d53c1(0x158)][_0x5d53c1(0x157)]===0x0)delete _0x415c1f[_0x5d53c1(0x158)];if(!_0x415c1f[_0x5d53c1(0x12f)])delete _0x415c1f[_0x5d53c1(0x12f)];if(!_0x415c1f[_0x5d53c1(0x159)])delete _0x415c1f[_0x5d53c1(0x159)];if(!_0x415c1f[_0x5d53c1(0x139)])delete _0x415c1f[_0x5d53c1(0x139)];!_0x415c1f[_0x5d53c1(0x15a)]&&(delete _0x415c1f[_0x5d53c1(0x137)],delete _0x415c1f['isGif']);!_0x415c1f[_0x5d53c1(0x130)]&&(delete _0x415c1f[_0x5d53c1(0x130)],delete _0x415c1f[_0x5d53c1(0x127)]);delete _0x415c1f['_data'],delete _0x415c1f[_0x5d53c1(0x113)],delete _0x415c1f[_0x5d53c1(0x149)];if(_0x415c1f[_0x5d53c1(0x150)]){let _0x30f0f3=await _0x415c1f[_0x5d53c1(0x15e)]()||{};_0x415c1f[_0x5d53c1(0x14f)]=await await serialize(_0x536e14,_0x30f0f3),delete _0x30f0f3['_data'];}return await await _0x415c1f;};


}


export { client, serialize }
