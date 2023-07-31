// Yang jual SC ini gw doain hidup sengsara. SC ini gw bagiin gratis jangan diperjualbelikan.
// Donate: 0895371549895
import './config.js';
import { format } from 'util';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { smsg } from './lib/simple.js';
import { readFileSync } from 'fs';
import chalk from 'chalk';
import restapi from './lib/restapi.js'
let isNumber = x => typeof x === 'number' && !isNaN(x);

export async function handler(m) {
  if (!m) return;
  await smsg(conn, m);
  if ( !m.fromMe && m.text.match( /(bot|berkahesport|berkahesportbot|botberkah|berkahesport.id)/gi ) ) {
  function pickRandom(list) { return list[Math.floor(Math.random() * list.length)]}
  let res = JSON.parse(readFileSync('./lib/emoji.json'))
  let em = res.emoji
  let emot = pickRandom(em)
  m.react(`${emot}`)
}
  try {
  if (m.fromMe || m.isBot) return;
    try {
    //  <----- Fungsi Database -----> Tambahin sendiri jika perlu.
      let user = global.db.data.users[m.sender];
      if (typeof user !== 'object')
        global.db.data.users[m.sender] = {};
      if (user) {if (!isNumber(user.healt)) user.healt = 0;
        if (!isNumber(user.stamina)) user.stamina = 100;
        if (!isNumber(user.level)) user.level = 0;
        if (!isNumber(user.exp)) user.exp = 0;
        if (!isNumber(user.limit)) user.limit = 10;
        if (!isNumber(user.lastclaim)) user.lastclaim = 0;
        if (!isNumber(user.money)) user.money = 0;
        //Alat-Alat
        if (!isNumber(user.armor)) user.armor = 0;
        if (!isNumber(user.armordurability)) user.armordurability = 0;
        if (!isNumber(user.sword)) user.sword = 0;
        if (!isNumber(user.sworddurability)) user.sworddurability = 0;
        if (!isNumber(user.pickaxe)) user.pickaxe = 0;
        if (!isNumber(user.pickaxedurability)) user.pickaxedurability = 0;
        if (!isNumber(user.fishingrod)) user.fishingrod = 0;
        if (!isNumber(user.fishingroddurability)) user.fishingroddurability = 0;
        if (!isNumber(user.senapan)) user.senapan = 0;
        if (!isNumber(user.senapandurability)) user.senapandurability = 0;
        //Tempat
        if (!isNumber(user.ojek)) user.ojek = 0;
        if (!isNumber(user.bank)) user.bank = 0;
        if (!isNumber(user.rumahsakit)) user.rumahsakit = 0;
        if (!isNumber(user.fortress)) user.fortress = 0;
        if (!isNumber(user.troopcamp)) user.troopcamp = 0;
        //BahanAlam
        if (!isNumber(user.gold)) user.gold = 0;
        if (!isNumber(user.diamond)) user.diamond = 0;
        if (!isNumber(user.iron)) user.iron = 0;
        if (!isNumber(user.batu)) user.batu = 0;
        if (!isNumber(user.kayu)) user.kayu = 0;
        if (!isNumber(user.string)) user.string = 0;

        //Buahbuahan
        if (!isNumber(user.anggur)) user.anggur = 0;
        if (!isNumber(user.jeruk)) user.jeruk = 0;
        if (!isNumber(user.mangga)) user.mangga = 0;
        if (!isNumber(user.apel)) user.apel = 0;
        if (!isNumber(user.pisang)) user.pisang = 0;
        if (!isNumber(user.bibitanggur)) user.bibitanggur = 0;
        if (!isNumber(user.bibitjeruk)) user.bibitjeruk = 0;
        if (!isNumber(user.bibitmangga)) user.bibitmangga = 0;
        if (!isNumber(user.bibitapel)) user.bibitapel = 0;
        if (!isNumber(user.bibitpisang)) user.bibitpisang = 0;
        if (!isNumber(user.gardenboxs)) user.gardenboxs = 0;

        //BarangMisteri
        if (!isNumber(user.common)) user.common = 0;
        if (!isNumber(user.uncommon)) user.uncommon = 0;
        if (!isNumber(user.mythic)) user.mythic = 0;
        if (!isNumber(user.legendary)) user.legendary = 0;
        if (!isNumber(user.sampah)) user.sampah = 0;
        //Makanan
        if (!isNumber(user.potion)) user.potion = 0;
        if (!isNumber(user.makananpet)) user.makananpet = 0;
        if (!isNumber(user.daging)) user.daging = 0;

        //Peliharaan
        if (!isNumber(user.kucing)) user.kucing = 0;
        if (!isNumber(user.kucingexp)) user.kucingexp = 0;
        if (!isNumber(user.kucinglastfeed)) user.kucinglastfeed = 0;
        if (!isNumber(user.kuda)) user.kuda = 0;
        if (!isNumber(user.kudaexp)) user.kudaexp = 0;
        if (!isNumber(user.kudalastfeed)) user.kudalastfeed = 0;
        if (!isNumber(user.rubah)) user.rubah = 0;
        if (!isNumber(user.rubahexp)) user.rubahexp = 0;
        if (!isNumber(user.rubahlastfeed)) user.rubahlastfeed = 0;
        if (!isNumber(user.anjing)) user.anjing = 0;
        if (!isNumber(user.anjingexp)) user.anjingexp = 0;
        if (!isNumber(user.anjinglastfeed)) user.anjinglastfeed = 0;
        if (!isNumber(user.anakkucing)) user.anakkucing = 0;
        if (!isNumber(user.anakkuda)) user.anakkuda = 0;
        if (!isNumber(user.anakrubah)) user.anakrubah = 0;
        if (!isNumber(user.anakanjing)) user.anakanjing = 0;
        if (!isNumber(user.pet)) user.pet = 0;

        //Lainnya
        if (!isNumber(user.tropy)) user.tropy = 0;
        if (!("liga" in user)) user.liga = "";
        if (!isNumber(user.joincount)) user.joincount = 0;
        if (!("chara" in user)) user.chara = "Tidak Punya";
        if (!("pasangan" in user)) user.pasangan = "";
        if (!("subscriber" in user)) user.subscriber = false;
        if (!("follow" in user)) user.follow = false;
        if (!("logged" in user)) user.logged = false;
        if (!("hentai" in user)) user.hentai = false;
        if (!("premium" in user)) user.premium = false;
        if (!isNumber(user.premiumTime)) user.premiumTime = 0;
        if (!isNumber(user.bannedDate)) user.bannedDate = 0;
        if (!"banned" in user) user.banned = false;
        if (!"mute" in user) user.mute = false;
        if (!"bannedReason" in user) user.bannedReason = "";
        if (!isNumber(user.warn)) user.warn = 0;
        if (!isNumber(user.afk)) user.afk = -1;
        if (!"afkReason" in user) user.afkReason = "";
        if (!isNumber(user.antispam)) user.antispam = 0;
        if (!isNumber(user.antispamlastclaim)) user.antispamlastclaim = 0;
        if (!("registered" in user)) user.registered = false;
        if (!("lastIstigfar" in user)) user.lastIstigfar = true;
        if (!("autolevelup" in user)) user.autolevelup = true;
        if (!user.registered) {
          if (!("name" in user)) user.name = m.pushname;
          if (!isNumber(user.age)) user.age = -1;
          if (!isNumber(user.regTime)) user.regTime = -1;
        }

        //Timer
        if (!isNumber(user.tebaktime)) user.tebaktime = 0;
        if (!isNumber(user.imgtime)) user.imgtime = 0;
        if (!isNumber(user.animetime)) user.animetime = 0;
        if (!isNumber(user.stikertime)) user.stikertime = 0;
        if (!isNumber(user.dltime)) user.dltime = 0;
        if (!isNumber(user.katatime)) user.katatime = 0;
        if (!isNumber(user.funtime)) user.funtime = 0;
        if (!isNumber(user.gctime)) user.gctime = 0;
        if (!isNumber(user.infotime)) user.infotime = 0;
        if (!isNumber(user.intertime)) user.intertime = 0;
        if (!isNumber(user.islamtime)) user.islamtime = 0;
        if (!isNumber(user.nsfwtime)) user.nsfwtime = 0;
        if (!isNumber(user.quotetime)) user.quotetime = 0;
        if (!isNumber(user.rpgtime)) user.rpgtime = 0;
        if (!isNumber(user.login)) user.login = Number(new Date);
        //Hewan
        if (!isNumber(user.unta)) user.unta = 0;
        if (!isNumber(user.kerbau)) user.kerbau = 0;
        if (!isNumber(user.sapi)) user.sapi = 0;
        if (!isNumber(user.keledai)) user.keledai = 0;
        if (!isNumber(user.domba)) user.domba = 0;
        if (!isNumber(user.kambing)) user.kambing = 0;
        if (!isNumber(user.rusa)) user.rusa = 0;
        if (!isNumber(user.kelinci)) user.kelinci = 0;
        if (!isNumber(user.angsa)) user.angsa = 0;
        if (!isNumber(user.bebek)) user.bebek = 0;
        if (!isNumber(user.ayam)) user.ayam = 0;
        if (!isNumber(user.burung)) user.burung = 0;
        //Ikan
        if (!isNumber(user.paus)) user.paus = 0;
        if (!isNumber(user.kepiting)) user.kepiting = 0;
        if (!isNumber(user.gurita)) user.gurita = 0;
        if (!isNumber(user.cumi)) user.cumi = 0;
        if (!isNumber(user.buntal)) user.buntal = 0;
        if (!isNumber(user.dory)) user.dory = 0;
        if (!isNumber(user.lumba)) user.lumba = 0;
        if (!isNumber(user.lobster)) user.lobster = 0;
        if (!isNumber(user.hiu)) user.hiu = 0;
        if (!isNumber(user.udang)) user.udang = 0;
        if (!isNumber(user.ikan)) user.ikan = 0;
        if (!isNumber(user.orca)) user.orca = 0;

        //WaktuRPG
        if (!isNumber(user.lastadventure)) user.lastadventure = 0;
        if (!isNumber(user.lastfishing)) user.lastfishing = 0;
        if (!isNumber(user.lastdungeon)) user.lastdungeon = 0;
        if (!isNumber(user.lastduel)) user.lastduel = 0;
        if (!isNumber(user.lastmining)) user.lastmining = 0;
        if (!isNumber(user.lasthunt)) user.lasthunt = 0;
        if (!isNumber(user.lastweekly)) user.lastweekly = 0;
        if (!isNumber(user.lastmonthly)) user.lastmontly = 0;
        if (!isNumber(user.lastberburu)) user.lastberburu = 0;
        if (!isNumber(user.lastberkebun)) user.lastberkebun = 0;
        if (!isNumber(user.expired)) user.expired = 0;
        if (!isNumber(user.suit)) user.suit = 0;

        //TimingKerja
        if (!isNumber(user.kerjasatu)) user.kerjasatu = 0;
        if (!isNumber(user.kerjadua)) user.kerjadua = 0;
        if (!isNumber(user.kerjatiga)) user.kerjatiga = 0;
        if (!isNumber(user.kerjaempat)) user.kerjaempat = 0;
        if (!isNumber(user.kerjalima)) user.kerjalima = 0;
      } else
        global.db.data.users[m.sender] = {
          healt: 100,
          stamina: 100,
          level: 0,
          exp: 0,
          limit: 10,
          lastclaim: 0,
          money: 0,
          //Alat-Alat
          armor: 0,
          armordurability: 0,
          sword: 0,
          sworddurability: 0,
          pickaxe: 0,
          pickaxedurability: 0,
          fishingrod: 0,
          fishingroddurability: 0,
          senapan: 0,
          senapandurability: 0,
          //Tempat
          ojek: 0,
          bank: 0,
          rumahsakit: 0,
          fortress: 0,
          troopcamp: 0,
          //BahanAlam
          gold: 0,
          diamond: 0,
          iron: 0,
          kayu: 0,
          batu: 0,
          string: 0,
          //BarangMisteri
          common: 0,
          uncommon: 0,
          mythic: 0,
          legendary: 0,
          sampah: 0,
          //Makanan
          potion: 0,
          makananpet: 0,
          daging: 0,

          //Buahbuahan
          pisang: 0,
          anggur: 0,
          mangga: 0,
          jeruk: 0,
          apel: 0,
          bibitpisang: 0,
          bibitanggur: 0,
          bibitmangga: 0,
          bibitjeruk: 0,
          bibitapel: 0,
          gardenboxs: 0,
          //Peliharaan
          kucing: 0,
          kucingexp: 0,
          kucinglastclaim: 0,
          kuda: 0,
          kudaexp: 0,
          kudalastclaim: 0,
          rubah: 0,
          rubahexp: 0,
          rubahlastclaim: 0,
          anjing: 0,
          anjingexp: 0,
          anjinglastclaim: 0,
          anakkucing: 0,
          anakkuda: 0,
          anakrubah: 0,
          anakanjing: 0,
          pet: 0,

          //Hewan
          unta: 0,
          kerbau: 0,
          sapi: 0,
          keledai: 0,
          domba: 0,
          kambing: 0,
          rusa: 0,
          kelinci: 0,
          angsa: 0,
          bebek: 0,
          ayam: 0,
          burung: 0,

          //Ikan
          paus: 0,
          kepiting: 0,
          gurita: 0,
          cumi: 0,
          buntal: 0,
          dory: 0,
          lumba: 0,
          lobster: 0,
          hiu: 0,
          udang: 0,
          ikan: 0,
          orca: 0,

          //Lainnya
          tropy: 0,
          joincount: 0,
          banned: false,
          mute: false,
          warn: 0, 
          afk: -1,
          afkReason: "",
          bannedReason: "",
          antispam: 0,
          antispamlastclaim: 0,
          as: 0,
          //Waktu
          lastadventure: 0,
          lastfishing: 0,
          lastdungeon: 0,
          lastduel: 0,
          lastmining: 0,
          lasthunt: 0,
          lastweekly: 0,
          lastmonthly: 0,
          lastberburu: 0,
          lastberkebun: 0,
          expired: 0,
          suit: 0,
          //Time
          imgtime: 0,
          animetime: 0,
          stikertime: 0,
          dltime: 0,
          tebaktime: 0,
          katatime: 0,
          funtime: 0,
          gctime: 0,
          infotime: 0,
          intertime: 0,
          islamtime: 0,
          nsfwtime: 0,
          rpgtime: 0,
          quotetime:0,
          login: Number(new Date),
          logged: false,

          //WaktuKerja
          kerjasatu: 0,
          kerjadua: 0,
          kerjatiga: 0,
          kerjaempat: 0,
          kerjalima: 0,

          registered: false,
          chara: "Tidak Punya",
          subscriber: false,
          follow: false,
          hentai: false,
          pasangan: "",
          premiumTime: 0,
          name: m.pushname,
          age: -1,
          regTime: -1,
          autolevelup: false,
          lastIstigfar: 0,
        };
        
      let chat = global.db.data.chats[m.chat];
      if (typeof chat !== "object") global.db.data.chats[m.chat] = {};
      if (chat) {
        if (!("isBanned" in chat)) chat.isBanned = false;
        if (!("welcome" in chat)) chat.welcome = true;
        if (!("detect" in chat)) chat.detect = true;
        if (!("sWelcome" in chat)) chat.sWelcome = "";
        if (!("sBye" in chat)) chat.sBye = "";
        if (!("sPromote" in chat)) chat.sPromote = "";
        if (!("sDemote" in chat)) chat.sDemote = "";
        if (!("sSubject" in chat)) chat.sSubject = "";
        if (!("sDesc" in chat)) chat.sDesc = "";
        if (!("descUpdate" in chat)) chat.descUpdate = true;
        if (!("delete" in chat)) chat.delete = true;
        if (!("antiBadword" in chat)) chat.antiBadword = true;
        if (!("rpg" in chat)) chat.rpg = true;
        if (!("nsfw" in chat)) chat.nsfw = true;
        if (!("antiLink" in chat)) chat.antiLink = false;
        if (!("viewonce" in chat)) chat.viewonce = false;
        if (!("autodelvn" in chat)) chat.autodelvn = true;
        if (!("antiToxic" in chat)) chat.antiToxic = false;
        if (!("simi" in chat)) chat.simi = false;
        if (!"trial" in chat) chat.trial = false;
        if (!("premnsfw" in chat)) chat.premnsfw = false;
        if (!isNumber(chat.expired)) chat.expired = Number(new Date());
      } else
        global.db.data.chats[m.chat] = {
          isBanned: false,
          welcome: false,
          detect: false,
          sWelcome: "",
          sBye: "",
          sPromote: "",
          sDemote: "",
          sSubject: "",
          sDesc: "",
          descUpdate: true,
          delete: true,
          rpg: true,
          nsfw: false,
          antiBadword: true,
          antiLink: false,
          viewonce: false,
          antiToxic: true,
          simi: false,
          expired: Number(new Date()),
          trial: false,
          premnsfw: false,
        };
      let settings = global.db.data.settings[this.user.jid];
      if (typeof settings !== "object")
        global.db.data.settings[this.user.jid] = {};
      if (settings) {
        if (!("self" in settings)) settings.self = false;
        if (!("autoread" in settings)) settings.autoread = true;
        if (!("restrict" in settings)) settings.restrict = false;
        if (!("autorestart" in settings)) settings.autorestart = true;
        if (!("restartDB" in settings)) settings.restartDB = 0;
        if (!"anon" in settings) settings.anon = true;
        if (!"anticall" in settings) settings.anticall = true;
        if (!"antispam" in settings) settings.antispam = true;
        if (!"antitroli" in settings) settings.antitroli = true;
        if (!"backup" in settings) settings.backup = false;
        if (!isNumber(settings.backupDB)) settings.backupDB = 0;
        if (!"groupOnly" in settings) settings.groupOnly = false;
        if (!"jadibot" in settings) settings.groupOnly = false;
        if (!"onsfw" in settings) settings.onsfw = false;
        if (!isNumber(settings.status)) settings.status = 0;
        if (!isNumber(settings.hittime)) settings.hittime = 0;
      } else
        global.db.data.settings[this.user.jid] = {
          self: false,
          autoread: true,
          restrict: false,
          autorestart: true,
          restartDB: 0,
          anon: true,
          anticall: true,
          antispam: true,
          antitroli: true,
          backup: false,
          backupDB: 0,
          groupOnly: false,
          jadibot: false,
          onsfw: false,
          status: 0,
          hittime: 0
        };
    } catch (e) {
      console.log("DATABASE RUSAK", e);
    }
    let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]
    // Untuk akses plugins kamu.
    let isGroup = m.from.endsWith("@g.us");
    let isROwner = global.nomor.rowner.map((v) => v?.replace(/[^0-9]/g, "") + '@c.us').includes(isGroup ? m.author : m.from);
    let isOwner = isROwner// || m.fromMe;
    let participants = isGroup ? (await m.getChat()).participants : [];
    let AdminFilter = isGroup ? participants.filter(v => v.isAdmin).map(v => v.id.user) : '';
    let isAdmin = isGroup ? AdminFilter.map(v => v.replace(/[^0-9]/g, '') + '@c.us').includes(m.author ? m.author : m.from) : false;
    let isBotAdmin = isGroup ? AdminFilter.map(v => v.replace(/[^0-9]/g, '') + '@c.us').includes(conn.info.me._serialized) : false;
    const isPrems = isROwner || global.db.data.users[m.sender].premium == true;
    const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')
    // Untuk menjalankan plugin prefix dan cmd kamu.
    let usedPrefix;
    for (let name in global.plugins) {
      let plugin = global.plugins[name];
      if (!plugin) continue;
      const __filename = path.join(___dirname, name)
      if (typeof plugin.all === 'function') {
        try {
            await plugin.all.call(this, m, {
                conn: this,
                participants,
                isPrems,
                isBotAdmin,
                __dirname: ___dirname,
                __filename
            })
        } catch (e) {
            console.error(`Plugins All => ${e}`)
             }
            }
      const str2Regex = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
      let _prefix = plugin.customPrefix ? plugin.customPrefix : '.'
      let match = (
        _prefix instanceof RegExp // RegExp Mode?
          ? [[_prefix.exec(m.text), _prefix]]
          : Array.isArray(_prefix) // Array?
            ? _prefix.map((p) => {
              let re = p instanceof RegExp // RegExp in Array?
                ? p
                : new RegExp(str2Regex(p));
              return [re.exec(m.text), re];
            })
            : typeof _prefix === "string" // String?
              ? [
                [
                  new RegExp(str2Regex(_prefix)).exec(m.text),
                  new RegExp(str2Regex(_prefix)),
                ],
              ]
              : [[[], new RegExp()]]
      ).find((p) => p[1]);
      if (typeof plugin.before === 'function') {
        if (await plugin.before.call(this, m, {
          match,
          conn: this,
          participants,
          isROwner,
          isOwner,
          isAdmin,
          isBotAdmin,
          isPrems,
          __dirname: ___dirname,
          __filename
        })) continue;
      }
      if (typeof plugin !== 'function') continue;

      if ((usedPrefix = (match[0] || "")[0])) {
        let noPrefix = m.text.replace(usedPrefix, "");
        let [command, ...args] = noPrefix.trim().split` `.filter((v) => v);
        args = args || [];
        let _args = noPrefix.trim().split` `.slice(1);
        let text = _args.join` `;
        command = (command || "").toLowerCase();
        let fail = plugin.fail || dfail; // <----- Jika ditolak ----->
        let isAccept = plugin.command instanceof RegExp // <----- RegExp Mode tidak memakai Prefix ----->
          ? plugin.command.test(command)
          : Array.isArray(plugin.command) // <----- Array ----->
            ? plugin.command.some((cmd) => cmd instanceof RegExp // <----- RegExp dalam Array ----->
              ? cmd.test(command)
              : cmd === command
            )
            : typeof plugin.command === "string" // String?
              ? plugin.command === command
              : false;

        if (!isAccept) continue;
        // Untuk Warna tanda CMD di print.js.
        m.isCommand = isAccept || false
        m.command = command || ''
        m.arg = _args[0] || []
        m.args = _args || []
        m.teks = text || 'Tidak Ada'
        m.plugin = name;
        if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
          let chat = global.db.data.chats[m.chat]
          let user = global.db.data.users[m.sender]
          if (name != 'main_unmuteme.js' && name != 'exp-daftar.js' && user?.mute) return this.reply(m.chat,`ᴀɴᴅᴀ ᴛᴇʟᴀʜ ᴅɪ ᴍᴜᴛᴇ ᴋᴀʀᴇɴᴀ ᴋᴇʙᴀɴʏᴀᴋᴀɴ ᴛᴏxɪᴄ
ᴍᴀꜱᴜᴋ ɢᴄ ᴅɪʙᴀᴡᴀʜ ɪɴɪ ᴋᴇᴍᴜᴅɪᴀɴ ᴋᴇᴛɪᴋ .unmuteme ᴅɪ ᴅᴀʟᴀᴍ ɢᴄ ᴛᴇʀꜱᴇʙᴜᴛ.
ʟɪɴᴋ ɢᴄ : ${global.group.gc1}

ᴀᴛᴀᴜ ꜱɪʟᴀʜᴋᴀɴ ʟᴀᴘᴏʀ ᴅᴀɴ ᴍᴀᴀꜰ ᴋᴇ ᴏᴡɴᴇʀ.
ᴺᴼ ᴼʷⁿᵉʳ: http://wa.me/62895375950107`.trim(), m) 
          if (name != 'admin-banunbanuser.js' && name != 'exp-daftar.js' && user?.banned) return this.reply(m.chat,`ᴀɴᴅᴀ ᴛᴇʟᴀʜ ᴅɪ ʙᴀɴɴᴇᴅ ꜱɪʟᴀʜᴋᴀɴ ʜᴜʙᴜɴɢɪ ᴏᴡɴᴇʀ ᴜɴᴛᴜᴋ ᴍɪɴᴛᴀ ᴍᴀᴀꜰ ᴅᴀɴ ᴅɪᴜɴʙᴀɴᴋᴀɴ ᴅᴀʀɪ ʙᴏᴛ...
ᴺᴼ ᴼʷⁿᵉʳ: http://wa.me/62895375950107
ʟɪɴᴋ ɢᴄ : ${global.group.gc1}`.trim(), m)}

      if (plugin.rowner && plugin.owner && !(isROwner || isOwner || oner)) { // Both Owner
          fail('rowner', m, this)
          continue
      }
      if (plugin.rowner && !isROwner) { // Real Owner
          fail('rowner', m, this)
          continue
      }
      if (plugin.owner && !isOwner) { // Number Owner
          fail('owner', m, this)
          continue
      }
      if (plugin.mods && !isMods) { // Moderator
          fail('mods', m, this)
          continue
      }
      if (plugin.premium && !isPrems) { // Premium
          fail('premium', m, this)
          continue
      }
      if (plugin.login && _user.logged === false && _user.registered === true) { // 86400 (1hari)NSFW Bukan di Grup
          buttonfail('login', m, this)
          continue
      }
      if (plugin.nsfw && !m.isGroup) { // NSFW Belum cukup umur
          fail('nsfw', m, this)
          continue
      }
      if (plugin.group && !m.isGroup) { // Group Only
          fail('group', m, this)
          continue
      } else if (plugin.botAdmin && !isBotAdmin) { // You Admin
          fail('botAdmin', m, this)
          continue
      } else if (plugin.admin && !isAdmin) { // User Admin
          fail('admin', m, this)
          continue
      }
      if (plugin.private && m.isGroup) { // Private Chat Only
          fail('private', m, this)
          continue
      }
      if (plugin.register == true && _user.registered == false) { // Butuh daftar?
          fail('unreg', m, this)
          continue
      }
      if (plugin.text && text.length > 1500 ) { // Private Chat Only
          fail('text', m, this)
          continue
      }
      m.exp = 1
      let xp = 'exp' in plugin ? parseInt(plugin.exp) : 1 // XP Earning per command
      if (xp > 200)
          m.reply('ɴɢᴇᴄɪᴛ -_-') // Hehehe
      else
          m.exp += xp
      if (!isPrems && plugin.limit && global.db.data.users[m.sender].limit < plugin.limit * 1) {
          this.reply(m.chat, `[❗] ʟɪᴍɪᴛ ᴀɴᴅᴀ ʜᴀʙɪꜱ, ꜱɪʟᴀʜᴋᴀɴ ʙᴇʟɪ ᴍᴇʟᴀʟᴜɪ *${usedPrefix}buy limit*.`, m)
          continue // Limit habis
      }
      if (plugin.level > _user.level) {
          this.reply(m.chat, `[💬] ᴅɪᴘᴇʀʟᴜᴋᴀɴ ʟᴇᴠᴇʟ ${plugin.level} ᴜɴᴛᴜᴋ ᴍᴇɴɢɢᴜɴᴀᴋᴀɴ ᴘᴇʀɪɴᴛᴀʜ ɪɴɪ.\n*ʟᴇᴠᴇʟ ᴍᴜ:* ${_user.level} 📊\nᴋᴇᴛɪᴋ: .ʟᴇᴠᴇʟᴜᴘ`, m)
          continue // If the level has not been reached
      }
      let extra = {
          match,
          usedPrefix,
          noPrefix,
          _args,
          args,
          command,
          text,
          conn: this,
          participants,
          isROwner,
          isOwner,
          isAdmin,
          isBotAdmin,
          isPrems,
          __dirname: ___dirname,
          __filename
      }
      try { 
          await plugin.call(this, m, extra)
          if (!isPrems) m.limit = m.limit || plugin.limit || false
      } catch (e) {
          m.error = e
          console.error(`Plugins Call => ${e}`)
          if (e) {
              let text = format(e)
              let textsender = text.replace((JSON.stringify(___dirname)), '#BerkahEsport.ID')
              for (let key of Object.values(restapi.apikey)) text = text.replace(new RegExp(key, 'g'), '#ApiBE')
              if (e.name) {
                  m.send(global.nomor.owner + '@c.us', `*🗂️ Plugin:* ${m.plugin}\n*👤 Sender:* ${m.sender}\n*💬 Chat:* https://wa.me/${m.sender.replace('@c.us','')}\n*💻 Command:* ${usedPrefix}${command} ${args.join(' ')}\n📄 *Error Logs:*\n\n\`\`\`${text}\`\`\``.trim(), { quoted: m})
              }
              m.reply(textsender.replace(new RegExp(`https://raw.githubusercontent.com/BerkahEsport/api-be/main/`, 'g'), '#BerkahEsport.ID')) //_ᴍᴀᴀꜰ ᴄᴏᴍᴍᴀɴᴅ ʏᴀɴɢ ᴀɴᴅᴀ ᴘᴀᴋᴀɪ ꜱᴇᴅᴀɴɢ ᴇʀʀᴏʀ, ꜱɪʟᴀʜᴋᴀɴ ᴄᴏʙᴀ ʙᴇʙᴇʀᴀᴘᴀ ꜱᴀᴀᴛ ʟᴀɢɪ...!_`.trim())`) 
          }
        
        } finally {
          if (typeof plugin.after === 'function') {
              try {
                  await plugin.after.call(this, m, extra)
              } catch (e) {
                  console.error(`Plugins After => ${e}`)
              }
          }
          if (m.limit)
              m.reply(+m.limit + ` 𝐿𝒾𝓂𝒾𝓉 𝓉𝑒𝓇𝓅𝒶𝓀𝒶𝒾 ✔️ \n _ꜱɪꜱᴀ ʟɪᴍɪᴛ ᴀɴᴅᴀ:_ ${global.db.data.users[m.sender].limit - (+m.limit)}`);
      }
      break
  }
}
} catch (e) {
console.error(`Try Error => ${e}`)
} finally {
  let stats = global.db.data.stats
  let user = global.db.data.users[m.sender]
try {
  await (await import(`./lib/print.js`)).default(conn, m)
  } catch (e) {
      console.log(e)
  }
if (m) {
  if (m.sender && (user = global.db.data.users[m.sender])) {
      user.exp += m.exp
      user.limit -= m.limit * 1
      user.antispam = Number(new Date)
}
if (m.plugin) {
if (!isNumber(stats.total)) stats.total = 0
if (!isNumber(stats.success)) stats.success = 0
if (!isNumber(stats.failed)) stats.failed = 0
if (!isNumber(stats.today)) stats.today = 0
  } else {
  stats = {
    total: 0,
    success: 0,
    failed: 0,
    today: 0 
} }
    stats.today += 1
    stats.total += 1
  if (m.error == null) {
    stats.success += 1
  } else {
    stats.failed += 1
  }
}

try {
if (global.db.data.settings[conn.user.jid] ) {
if (Number(new Date * 1) - global.db.data.settings[conn.user.jid].hittime > 86400000) {
global.db.data.settings[conn.user.jid].hittime = Number(new Date) //1 Hari
if (stats.today) {
this.reply(global.nomor.ownerid ,`ᴛᴏᴛᴀʟ ʜɪᴛ ᴋᴇᴍᴀʀɪɴ: ${stats.today}`) 
stats.today = 0
} } else return } else return
} catch (e) {
console.log(e)
}
}
}

const buttonfail = async (type, m, conn) => {
  let nologin = `ᴵⁿᵍᵃᵗ!!! ᴶⁱᵏᵃ ᵃⁿᵈᵃ ᵗⁱᵈᵃᵏ ˡᵒᵍⁱⁿ ˢᵉˡᵃᵐᵃ ³⁰ ʰᵃʳⁱ ᵐᵃᵏᵃ ᵈᵃᵗᵃ ᵃⁿᵈᵃ ᵃᵏᵃⁿ ᵈⁱ ʰᵃᵖᵘˢ ᵖᵉʳᵐᵃⁿᵉⁿ ᵈᵃʳⁱ ᵇᵒᵗ. ᵀᵉʳⁱᵐᵃ ᵏᵃˢⁱʰ...`.trim()
  let pesan = {
      login: `*★彡[ʟᴏɢɪɴ ]彡★* 

• ꜱɪʟᴀʜᴋᴀɴ ʟᴏɢɪɴ ᴅᴜʟᴜ ᴅᴇɴɢᴀɴ ᴍᴇɴɢᴇᴛɪᴋ .login ᴜɴᴛᴜᴋ ᴍᴇɴɢᴀᴋꜱᴇꜱ ʙᴏᴛ...\n\n\n`,
  
  } [type];
   if (pesan)
  return conn.sendFile(m.chat,global.logo.thumb, '', pesan + nologin,m) 
}
const dfail = async (type, m, conn) => {
  let msg = {
    rowner: "*𝕂ℍ𝕌𝕊𝕌𝕊 𝔻𝔼𝕍𝔼𝕃𝕆ℙ𝔼ℝ* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴅᴇᴠᴇʟᴏᴘᴇʀ ʙᴏᴛ",
    owner: "*𝕂ℍ𝕌𝕊𝕌𝕊 𝕆𝕎ℕ𝔼ℝ* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ ʙᴏᴛ",
    mods: "*𝕂ℍ𝕌𝕊𝕌𝕊 𝕄𝕆𝔻𝔼ℝ𝔸𝕋𝕆ℝ* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴍᴏᴅᴇʀᴀᴛᴏʀ ʙᴏᴛ",
    premium: "*𝕂ℍ𝕌𝕊𝕌𝕊 ℙℝ𝔼𝕄𝕀𝕌𝕄* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴘʀᴇᴍɪᴜᴍ ᴜsᴇʀ",
    group: "*𝕂ℍ𝕌𝕊𝕌𝕊 𝔾ℝ𝕆𝕌ℙ* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ʙɪsᴀ ᴅɪᴘᴀᴋᴀɪ ᴅɪᴅᴀʟᴀᴍ ɢʀᴏᴜᴘ",
    private: "*𝕂ℍ𝕌𝕊𝕌𝕊 ℂℍ𝔸𝕋 ℙℝ𝕀𝔹𝔸𝔻𝕀* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ʙɪsᴀ ᴅɪᴘᴀᴋᴀɪ ᴅɪᴘʀɪᴠᴀᴛᴇ ᴄʜᴀᴛ",
    admin: "*𝕂ℍ𝕌𝕊𝕌𝕊 𝔸𝔻𝕄𝕀ℕ* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴀᴅᴍɪɴ ɢʀᴏᴜᴘ",
    botAdmin: "*𝕂ℍ𝕌𝕊𝕌𝕊 𝔹𝕆𝕋 𝔸𝔻𝕄𝕀ℕ* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ʙɪsᴀ ᴅɪɢᴜɴᴀᴋᴀɴ ᴋᴇᴛɪᴋᴀ ʙᴏᴛ ᴍᴇɴᴊᴀᴅɪ ᴀᴅᴍɪɴ",
    restrict: "*𝕄𝔼ℕ𝕌 𝔸𝔻𝕄𝕀ℕ* • ʀᴇsᴛʀɪᴄᴛ ʙᴇʟᴜᴍ ᴅɪɴʏᴀʟᴀᴋᴀɴ ᴅɪᴄʜᴀᴛ ɪɴɪ",
    nsfw: `*ℙ𝔸ℝ𝔸ℍ 𝕃𝕌!!!* • ɴᴀᴋ ᴋᴀᴍᴜ ʙᴇʟᴜᴍ ᴄᴜᴋᴜᴘ ᴜᴍᴜʀ. ᴊᴀɴɢᴀɴ ᴍᴀᴋꜱᴀ!!!`,
    text: `*𝕋𝔼𝕂𝕊 𝕃𝕀𝕄𝕀𝕋𝔼𝔻* • ᴛᴇᴋꜱ ʏᴀɴɢ ᴋᴀᴍᴜ ᴍᴀꜱᴜᴋᴋᴀɴ ᴛᴇʀʟᴀʟᴜ ʙᴀɴʏᴀᴋ! ᴍᴀᴋꜱ. 1500 ᴋᴀʀᴀᴋᴛᴇʀ. ` 
  }[type];
  if (msg)
  return conn.sendMessage(m.from, global.logo.thumb ,{caption: msg})
  let msgg = {
      unreg: "ʜᴀʟʟᴏ ᴋᴀᴋ ! 👋\nᴀɴᴅᴀ ʜᴀʀᴜs ᴍᴇɴᴅᴀғᴛᴀʀ ᴋᴇ ᴅᴀᴛᴀʙᴀsᴇ ʙᴏᴛ ᴅᴜʟᴜ sᴇʙᴇʟᴜᴍ ᴍᴇɴɢɢᴜɴᴀᴋᴀɴ ғɪᴛᴜʀ ɪɴɪ\n\nᴋᴇᴛɪᴋ .daftar ɴᴀᴍᴀ.ᴜᴍᴜʀ \nᴄᴏɴᴛᴏʜ .daftar BerkahEsport.26" }//➞ ᴋʟɪᴄᴋ ᴛᴏᴍʙᴏʟ ᴅɪʙᴀᴡᴀʜ ᴜɴᴛᴜᴋ ᴍᴇɴᴅᴀғᴛᴀʀ ᴋᴇ ᴅᴀᴛᴀʙᴀsᴇ ʙᴏᴛ
  [ type ];
  if (msgg)
    return conn.sendFile(m.chat,global.logo.thumb, 'be.jpg', `❖『 *VERIFY*  』❖ \n\n${msgg}`,m) }
 

/**
 * Handle groups participants update
 * @param {Object} action
 */
export async function participantsUpdate (action, conn) {
  if (conn.user.id === global.nomor.bot || conn.user.jid === global.nomor.bot+'@c.us') return;
  if (global.db.data == null) await loadDatabase()
  let id = action.id.remote || action.participant.chatId
  let participants = action.recipientIds.map(v =>  v._serialized)
  let chat = global.db.data.chats[id] || {}
  let welcome = '❖━━━━━━[ ᴡᴇʟᴄᴏᴍᴇ ]━━━━━━❖\n\n┏––––––━━━━━━━━•\n│☘︎ @subject\n┣━━━━━━━━┅┅┅\n│( 👋 Hallo @user)\n├ ᴋᴇᴛɪᴋ _.intromember_ \n├ ᴜɴᴛᴜᴋ ᴅᴀᴛᴀ \n├ ᴘᴇɴɢᴇɴᴀʟᴀɴ ᴅɪʀɪ ᴋᴀᴍᴜ.\n┗––––––━━┅┅┅\n\n––––––┅┅ ᴅᴇsᴄʀɪᴘᴛɪᴏɴ ┅┅––––––\n@desc'
  let bye = '❖━━━━━━[ ʟᴇᴀᴠɪɴɢ ]━━━━━━❖\n𝚂𝚊𝚢𝚘𝚗𝚊𝚛𝚊𝚊 @user 👋😃'
  let text = ''
  switch (action.type) {
    case 'add':
    case 'invite':
    case 'leave':
    case 'remove':
            let groupMetadata = await conn.groupMetadata(id)|| {}
            for (let user of participants) {
                let pp = global.logo.thumb
                try {
                    pp = await conn.getProfilePicUrl(user)
                } catch (e) {
                  conn.sendMessage(global.nomor.ownerid, JSON.stringify(e))
                  console.log(JSON.stringify(e))
                } finally { 
                   text = (action.type === 'add' || action.type === 'invite' ? (chat.sWelcome|| welcome || 'Welcome, @user!').replace('@subject', groupMetadata.subject || 'GROUP').replace('@desc', groupMetadata.desc?.toString() || ' ') :
                        (chat.sBye || bye || 'Bye, @user!')).replace('@user', '@' + user.split('@')[0])
                        conn.sendMessage(id, pp, {caption: text, mentions: [user] })
                
                }
            }
        break
    case 'promote':
    case 'demote' :
      let promote = '❖━━━━━━[ ᴘʀᴏᴍᴏᴛᴇ ]━━━━━━❖\n\nSuccess PROMOTE:\n@user'
      let demote = '❖━━━━━━[ ᴅᴇᴍᴏᴛᴇ ]━━━━━━❖\n\nSuccess DEMOTE:\n@user'
            for (let user of participants) {
                let pp = global.logo.thumb
                try {
                    pp = await conn.getProfilePicUrl(user)
                } catch (e) {
                  conn.sendMessage(global.nomor.ownerid, JSON.stringify(e))
                  console.log(JSON.stringify(e))
                } finally { 
                   text = (action.type === 'promote'? (chat?.sPromote|| promote || 'Promote, @user!').replace('@user', '@' + user.split('@')[0]) :
                        (chat?.sDemote || demote || 'Demote, @user!')).replace('@user', '@' + user.split('@')[0])
                        conn.sendMessage(id, pp, {caption: text, mentions: [user] })
                
                }
            }
}
}

/**
 * Handle groups update
 * @param {*} groupsUpdate 
 */
export async function groupsUpdate(groupUpdate, conn) {
      try{
          const id = groupUpdate.id ? groupUpdate.id?.remote : groupUpdate.chatId ? groupUpdate?.chatId : ''
          const author = groupUpdate?.author || conn.user.jid || ''
          const participant = groupUpdate.id ? groupUpdate.id?.participant?.user : ''
          console.log('\n\n=============\n\n In Groups Update \n\n============\n\n'+ `Id: ${id}` + `\nParticipants: ${participant}` + '\n\n==============================\n')
          if (!id) return
          let chats = global.db.data.chats[id], text = ''
          if (!chats.detect) return
          if (groupUpdate.type === 'description') text = (chats?.sDesc || `*❖━━━━━━[ ᴅᴇꜱᴄʀɪᴘᴛɪᴏɴ ]━━━━━━❖*\nᴼˡᵉʰ: ${author}\n\n@desc`).replace('@desc', groupUpdate.body)
          if (groupUpdate.type === 'subject') text = (chats?.sSubject || `*❖━━━━━━[ ꜱᴜʙᴊᴇᴄᴛ ]━━━━━━❖*\nᴼˡᵉʰ: ${author}\n\n@subject`).replace('@subject', groupUpdate.body)
          if (groupUpdate.type === 'picture' && groupUpdate.body === 'set') text = (chats?.sIcon || `*❖━━━━━━[ ɪᴄᴏɴ ]━━━━━━❖*\nᴼˡᵉʰ: ${author}`) //to*').replace('@icon', groupUpdate.icon)
          if (groupUpdate.type === 'revoke') text = (chats.sRevoke || `*❖━━━━━━[ ʀᴇᴠᴏᴋᴇ ]━━━━━━❖*\nᴼˡᵉʰ: ${author}\n\n@revoke`).replace('@revoke', groupUpdate.body)
          if (groupUpdate.type === 'announce' && groupUpdate.body === 'on') text = (chats?.sAnnounceOn || `*❖━━━━━━[ ɢʀᴏᴜᴘ ᴏᴘᴇɴ ]━━━━━━❖*\nᴼˡᵉʰ: ${author}`)
          if (groupUpdate.type === 'announce' && groupUpdate.body === 'off') text = (chats?.sAnnounceOff || `*❖━━━━━━[ ɢʀᴏᴜᴘ ᴄʟᴏꜱᴇ ]━━━━━━❖*\nᴼˡᵉʰ: ${author}`)
          if (groupUpdate.type === 'restrict' && groupUpdate.body === 'on') text = (chats?.sRestrictOn || `*❖━━━━━━[ ᴀʟʟ ᴍᴇᴍʙᴇʀ ]━━━━━━❖*\nᴼˡᵉʰ: ${author}`)
          if (groupUpdate.type === 'restrict' && groupUpdate.body === 'off') text = (chats?.sRestrictOff || `*❖━━━━━━[ ᴏɴʟʏ ᴀᴅᴍɪɴ ]━━━━━━❖*\nᴼˡᵉʰ: ${author}`)
          if (!text) return
          conn.sendMessage(id, text, {mentions: [author]})
          conn.reply(global.nomor.ownerid, JSON.stringify(groupUpdate))
        } catch (e) { 
          conn.reply(global.nomor.ownerid, JSON.stringify(e))
        }
      }

let fileP = fileURLToPath(import.meta.url)
fs.watchFile(fileP, () => {
fs.unwatchFile(fileP)
console.log(`Update File "${chalk.green(fileP)}"`)
import(`${import.meta.url}?update=${Date.now()}`)
})
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
