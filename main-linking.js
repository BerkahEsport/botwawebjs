
// <===== BERKAHESPORT.ID OFC =====>>
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
import path from 'node:path'
import { platform } from 'node:process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createRequire } from 'module' // Bring in the ability to create the 'require' method
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') { return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString() }; 
global.__dirname = function dirname(pathURL) { return path.dirname(global.__filename(pathURL, true)) }; 
global.__require = function require(dir = import.meta.url) { return createRequire(dir) }
const __dirname = global.__dirname(import.meta.url)
import { Client, protoType } from "./lib/simple.js"
import { LinkingMethod} from 'whatsapp-web.js'
import syntaxerror from "syntax-error";
import fs from 'fs'
import { JSONFile, Low } from 'lowdb'
import _ from 'lodash'
import { format } from 'util'
import pkg from 'chalk';
const { red, green, yellow, cyan, magenta, yellowBright, white, gray, grey } = pkg;
const handler = await import('./handler.js');
global.db = new Low( new JSONFile('./lib/data/database.json'));
// <===== Connect ke BOT =====>
async function ClientConnect() { 
    global.conn = new Client({
// <===== VIA CODE =====>
      linkingMethod: new LinkingMethod({ // Perlu diketahui ini cuma work pakai Linux.
          phone: {
            number: global.nomor.bot // Masuukan nomor kamu disini.
          },
        }),
      playwright: {
          headless: true,
          devtools: false,
          userDataDir: ".mywajs_auth",
         },
        markOnlineAvailable: false,
        authTimeoutMs: 60000,
        clearSessions: 30, // minutes, 0 = false
        clearMsg: 0, // minutes, 0 = false
        otherClear: 1, // minutes, 0 = false (session other bot)
})
// <===== Membuka Chromium Playwright =====>
conn.initialize();
// <===== Membuat Linking CODE =====>
conn.on('code', (qr) => {
    console.log('CODE:', yellow(qr));
  });
conn.on("loading_screen", async (message, percent) => {
  console.info(`Menghubungkan, membuka ${yellow(message)} => ${red(percent)}`);
});
// <===== BOT sudah terhubung ke Whatsapp =====>
conn.on('ready', async () => {
    if (global.db.data == null) await loadDatabase();
    console.log(cyan("Klien bot sudah siap!!")); // Code dibawah buat info bot ini berjalan sukses...
    await conn.sendMessage("62895375950107@c.us", `${JSON.stringify(conn.info)}`)
});
// <===== Mekanisme pesan BOT Whatsapp =====>
conn.on('message_create', await handler.handler.bind(global.conn));
conn.on('group_admin_changed', async (admin) => await handler.participantsUpdate(global.conn, admin));
conn.on('group_join', async (join) => await handler.participantsUpdate(global.conn, join));
conn.on('group_leave', async (leave) => await handler.participantsUpdate(global.conn, leave));
conn.on('group_update', async (group) => await handler.groupsUpdate(global.conn, group));
return conn
}

// <===== MEMBUKA PLUGINS =====> By: @moexti
const pluginFolder = global.__dirname(path.join(__dirname, './plugins/index'))
const pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}
async function filesInit() {
  for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      let file = global.__filename(path.join(pluginFolder, filename))
      const module = await import(file)
      global.plugins[filename] = module.default || module
    } catch (e) {
      console.error(`filesInit => ${white(e)}`)
      delete global.plugins[filename]
    }
  }
}
// <===== RELOAD PLUGINS =====>
global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    let dir = global.__filename(path.join(pluginFolder, filename), true)
    if (filename in global.plugins) {
      if (fs.existsSync(dir)) console.info(`Kembali membaca plugin '${magenta(filename)}'`)
      else {
        console.warn(`Menghapus plugin '${red(filename)}'`)
        return delete global.plugins[filename]
      }
    } else console.info(`Membuat plugin baru '${green(filename)}'`)
    let err = syntaxerror(fs.readFileSync(dir), filename, {
      sourceType: 'module',
      allowAwaitOutsideFunction: true
    })
    if (err) console.error(`Syntax bermasalah '${grey(filename)}'\n${format(err)}`)
    else try {
      const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`))
      global.plugins[filename] = module.default || module
    } catch (e) {
      console.error(`Bermasalah membaca plugin '${gray(filename)}\n${format(e)}'`)
    } finally {
      global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
    }
  }
}
// <===== Memuat Database BOT =====>
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
// <===== Menyimpan database BOT =====>
setInterval(async () =>{
  if (global.db) await global.db.write();
}, 30 * 1000)
// <===== RUN ALL =====>
loadDatabase()
ClientConnect().catch(e => console.error(yellowBright(e)))
filesInit().then(_ => console.log(green('PLUGINS BERHASIL DIMUAT...'))).catch(console.error)
Object.freeze(global.reload)
fs.watch(pluginFolder, global.reload)
protoType()
// <===== JANGAN DI HAPUS =====>
let fileP = fileURLToPath(import.meta.url)
fs.watchFile(fileP, () => {
    fs.unwatchFile(fileP)
    console.log(`Update File "${yellow(fileP)}"`)
    import(`${import.meta.url}?update=${Date.now()}`)
})