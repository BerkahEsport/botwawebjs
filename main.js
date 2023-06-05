
// <----- BERKAHESPORT.ID OFC ----->>
/* Whatsapp bot versi WAWEB ini mohon digunakan dengan bijak
Terimakasih Untuk ALLAH S.W.T.
Serta junjungan kami nabi Muhammad S.A.W

Base dibuat tanggal 28 Mei 2023
Oleh: https://github.com/BerkahEsport/
Collaborator : https://github.com/Leuthra/
-
- Silahkan tambah disini bro...
Jangan ubah yak mending ditambah... ^_^
*/

import './config.js'
import path, { join } from 'path'
import { platform } from 'process'
import { fileURLToPath, pathToFileURL } from 'url'
import { createRequire } from 'module' // Bring in the ability to create the 'require' method
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') { return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString() }; global.__dirname = function dirname(pathURL) { return path.dirname(global.__filename(pathURL, true)) }; global.__require = function require(dir = import.meta.url) { return createRequire(dir) }
const __dirname = global.__dirname(import.meta.url)
import { client } from "./lib/simple.js"
import {LocalAuth} from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal'
import syntaxerror from "syntax-error";
import fs, {
  readdirSync,
  existsSync,
  readFileSync
}  from 'fs'
import { JSONFile, Low } from 'lowdb'
import _ from 'lodash'
import { format } from 'util'
import pkg from 'chalk';
const { red, green, yellow, cyan, magenta, yellowBright } = pkg;
let handler = await import('./handler.js')

global.db = new Low(
    new JSONFile('database.json')
  )



async function ClientConnect() { 
    global.conn = new client({
    authStrategy: new LocalAuth(), //make mywajs amiruldev20
    playwright: {
      headless: true,
      devtools: false,
      args: [
          '--aggressive-tab-discard',
          '--disable-accelerated-2d-canvas',
          '--disable-application-cache',
          '--disable-cache',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--disable-offline-load-stale-cache',
          '--disable-setuid-sandbox',
          '--disable-setuid-sandbox',
          '--disk-cache-size=0',
          '--ignore-certificate-errors',
          '--no-first-run',
          '--no-sandbox',
          '--no-zygote',
      ],
      bypassCSP: true,
    },
    markOnlineAvailable: true,
    qrMaxRetries: 6,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15',
    takeoverTimeoutMs: 'Infinity',
    clearSessions: true
});


conn.initialize();
// <----- Membuat QR untuk di scan Perangkat tertaut ----->
conn.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log(cyan("Scan QR Code di atas agar terhubung ke WaWeb..."));
  });
  

// <----- BOT sudah terhubung ke Whatsapp ----->
conn.on('ready', async () => {
    if (global.db.data == null) await loadDatabase();
    console.log(green("Klien bot sudah siap!!")); // Code dibawah buat info bot ini berjalan sukses...
    await conn.sendMessage("62895375950107@c.us", `${JSON.stringify(conn.info)}`)
  });

conn.on('message_create', handler.handler.bind(conn));
}
ClientConnect().catch(e => console.error(e))

// Created by @moexti
const pluginFolder = global.__dirname(join(__dirname, './plugins/index'))
const pluginFilter = fs.readdirSync(pluginFolder, { withFileTypes: true }).filter((v) => v.isDirectory());
const pluginFile = filename => /\.js$/.test(filename)
global.plugins = {}
const _0x38427c=_0x13cd;(function(_0x3e9120,_0x2b0111){const _0x10aed8=_0x13cd,_0x59ce71=_0x3e9120();while(!![]){try{const _0x52ac77=parseInt(_0x10aed8(0xc3))/0x1*(-parseInt(_0x10aed8(0xd3))/0x2)+-parseInt(_0x10aed8(0xd1))/0x3*(-parseInt(_0x10aed8(0xd2))/0x4)+-parseInt(_0x10aed8(0xc6))/0x5+parseInt(_0x10aed8(0xd0))/0x6*(-parseInt(_0x10aed8(0xcd))/0x7)+-parseInt(_0x10aed8(0xc2))/0x8*(parseInt(_0x10aed8(0xc9))/0x9)+parseInt(_0x10aed8(0xce))/0xa+-parseInt(_0x10aed8(0xc8))/0xb*(-parseInt(_0x10aed8(0xc1))/0xc);if(_0x52ac77===_0x2b0111)break;else _0x59ce71['push'](_0x59ce71['shift']());}catch(_0x4b42c2){_0x59ce71['push'](_0x59ce71['shift']());}}}(_0x595a,0xa1071));function _0x13cd(_0x34354c,_0x315cc0){const _0x595ae8=_0x595a();return _0x13cd=function(_0x13cddb,_0x27f662){_0x13cddb=_0x13cddb-0xc1;let _0x390377=_0x595ae8[_0x13cddb];return _0x390377;},_0x13cd(_0x34354c,_0x315cc0);}async function filesInit(){const _0x435de1=_0x13cd;pluginFilter[_0x435de1(0xcf)](async({name:_0x388340})=>{const _0x25f278=_0x435de1;global['plugins']={};let _0x3d5be8=await readdirSync(path[_0x25f278(0xcc)](pluginFolder,_0x388340));for(let _0x4681df of _0x3d5be8){try{let _0x3dc414=global[_0x25f278(0xc7)](join(pluginFolder,_0x388340,_0x4681df));const _0x4dc05c=await import(_0x3dc414);global[_0x25f278(0xcb)][_0x4681df]=_0x4dc05c[_0x25f278(0xd4)]||_0x4dc05c,fs[_0x25f278(0xca)](pluginFolder+'/'+_0x388340,global[_0x25f278(0xc4)]);}catch(_0x561f07){console['log'](_0x561f07),delete global[_0x25f278(0xcb)][_0x4681df];}}});}filesInit()[_0x38427c(0xc5)](_0x23fd0d=>console['log'](green(_0x38427c(0xd5))))['catch'](console['error']);function _0x595a(){const _0x26fa00=['6xKtzrD','1866129cgafyK','4HMDoLu','717742gEjbFX','default','PLUGINS\x20BERHASIL\x20DIMUAT...','11296212qKgNnE','32liuiFr','1cAptUh','reload','then','5769225FCtaoI','__filename','22NpzSAb','224253JsRKsc','watch','plugins','join','8795794bYAbmA','10237500ZFnPnJ','map'];_0x595a=function(){return _0x26fa00;};return _0x595a();}
(function(_0x1fc1f5,_0x11b4dc){const _0x3e676d=_0x1dc4,_0xde9086=_0x1fc1f5();while(!![]){try{const _0x3c7769=-parseInt(_0x3e676d(0x151))/0x1+-parseInt(_0x3e676d(0x140))/0x2+parseInt(_0x3e676d(0x145))/0x3*(-parseInt(_0x3e676d(0x149))/0x4)+parseInt(_0x3e676d(0x13f))/0x5+-parseInt(_0x3e676d(0x146))/0x6+parseInt(_0x3e676d(0x143))/0x7*(parseInt(_0x3e676d(0x14c))/0x8)+parseInt(_0x3e676d(0x14b))/0x9;if(_0x3c7769===_0x11b4dc)break;else _0xde9086['push'](_0xde9086['shift']());}catch(_0x2880e9){_0xde9086['push'](_0xde9086['shift']());}}}(_0x6486,0x93c2a),global['reload']=async(_0x4fb359,_0x357aff)=>{const _0x463ad6=_0x1dc4;if(pluginFile(_0x357aff)){let _0x5552a1=await fs[_0x463ad6(0x13e)](pluginFolder);_0x5552a1[_0x463ad6(0x150)](async _0x31c2da=>{const _0x208988=_0x463ad6;let _0x1a61bf=global['__filename'](join(pluginFolder,_0x31c2da,_0x357aff),!![]);if(fs[_0x208988(0x14d)](_0x1a61bf)){if(_0x357aff in global['plugins']){if(existsSync(_0x1a61bf))console[_0x208988(0x14f)](_0x208988(0x13d)+yellowBright(_0x357aff)+'\x27');else return console[_0x208988(0x14f)](magenta(_0x208988(0x142)+red(_0x357aff)+'\x27')),delete global[_0x208988(0x147)][_0x357aff];}else console['info'](_0x208988(0x14e)+green(_0x357aff)+'\x27');let _0x245877=syntaxerror(readFileSync(_0x1a61bf),_0x357aff,{'sourceType':_0x208988(0x144),'allowAwaitOutsideFunction':!![]});if(_0x245877)console[_0x208988(0x13c)]('Sintax\x20error\x20ketika\x20dimuat\x20\x20\x27'+red(_0x357aff)+'\x27\x0a'+format(_0x245877));else try{const _0xc6036=await import(global['__filename'](_0x1a61bf)+'?update='+Date[_0x208988(0x148)]());global[_0x208988(0x147)][_0x357aff]=_0xc6036[_0x208988(0x153)]||_0xc6036;}catch(_0x9f4bd2){console['error'](_0x208988(0x14a)+red(_0x357aff)+'\x0a'+format(_0x9f4bd2)+'\x27');}finally{global[_0x208988(0x147)]=Object['fromEntries'](Object[_0x208988(0x152)](global[_0x208988(0x147)])['sort'](([_0x665a2],[_0x50a253])=>_0x665a2[_0x208988(0x141)](_0x50a253)));}}});}});function _0x1dc4(_0x196444,_0x123486){const _0x6486b4=_0x6486();return _0x1dc4=function(_0x1dc4f4,_0x3ec84d){_0x1dc4f4=_0x1dc4f4-0x13c;let _0x352c4f=_0x6486b4[_0x1dc4f4];return _0x352c4f;},_0x1dc4(_0x196444,_0x123486);}function _0x6486(){const _0x56f814=['-\x20Menghapus\x20plugin\x20\x27','34678FJltTK','module','12sjQqWU','6692340jSBwtT','plugins','now','1038464ammyef','-\x20Plugin\x20bermasalah\x20\x27','12506058Zucowm','1192HpILgT','existsSync','-\x20Menambah\x20plugin\x20\x27','log','forEach','147850omxczF','entries','default','error','-\x20Perubahan\x20plugin\x20\x27','readdirSync','5785075tHXkvh','755586dxwTfY','localeCompare'];_0x6486=function(){return _0x56f814;};return _0x6486();}
Object.freeze(global.reload)

// // <----- Memuat Database BOT ----->

loadDatabase()
async function loadDatabase() {
  await global.db.read()
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    settings: {},
    ...(global.db.data || {})
  }
  global.db.chain = _.chain(global.db.data)
}

// // <----- Menyimpan database BOT ----->
setInterval(async () =>{
  if (global.db) await global.db.write();
}, 30 * 1000)


/*============== JANGAN DIUBAH ==============*/
let fileP = fileURLToPath(import.meta.url)
fs.watchFile(fileP, async () => {
    fs.unwatchFile(fileP)
    console.log(`Update File "${chalk.yellowBright(fileP)}"`)
    import(`${import.meta.url}?update=${Date.now()}`)
})