// Yang jual SC ini gw doain hidup sengsara. SC ini gw bagiin gratis jangan diperjualbelikan.
// Donate: 0895371549895
import './config.js';
import { format } from 'util';
import chalk from 'chalk'
import fs from 'fs'
import { fileURLToPath } from 'node:url';
var isNumber = x => typeof x === 'number' && !isNaN(x);
export async function handler(m) {
  if (!m)
    return;
  let chats = await m.getChat();
  
  //jangan didelete ya mas nanti error
  function _0x1b2f(){var _0x306704=['230389jffSSX','32030TDpuyi','serialize','2088500qIPVXT','1996022PpHzgi','1755440PgaEfc','2QeCbmY','1137186QeWJQY','24MKKsau','1926tCZXFj','4228444mxsGLp','./lib/simple.js'];_0x1b2f=function(){return _0x306704;};return _0x1b2f();}var _0x5d686a=_0x1d78;function _0x1d78(_0x44486f,_0x96680f){var _0x1b2fe6=_0x1b2f();return _0x1d78=function(_0x1d78fb,_0x3f8495){_0x1d78fb=_0x1d78fb-0x1bf;var _0x5bf0ea=_0x1b2fe6[_0x1d78fb];return _0x5bf0ea;},_0x1d78(_0x44486f,_0x96680f);}(function(_0x4b957f,_0x47cd47){var _0x2afd54=_0x1d78,_0x254f1a=_0x4b957f();while(!![]){try{var _0x3df4ac=-parseInt(_0x2afd54(0x1ca))/0x1+-parseInt(_0x2afd54(0x1c4))/0x2*(parseInt(_0x2afd54(0x1c5))/0x3)+parseInt(_0x2afd54(0x1c8))/0x4+parseInt(_0x2afd54(0x1c1))/0x5+parseInt(_0x2afd54(0x1c6))/0x6*(-parseInt(_0x2afd54(0x1c2))/0x7)+parseInt(_0x2afd54(0x1c3))/0x8+-parseInt(_0x2afd54(0x1c7))/0x9*(-parseInt(_0x2afd54(0x1bf))/0xa);if(_0x3df4ac===_0x47cd47)break;else _0x254f1a['push'](_0x254f1a['shift']());}catch(_0x2c4fed){_0x254f1a['push'](_0x254f1a['shift']());}}}(_0x1b2f,0x99b90),await(await import(_0x5d686a(0x1c9)))[_0x5d686a(0x1c0)](conn,m));
  
  let users = await m.getContact();
  try {
    m.chat = m.from// .endsWith("@g.us") ? m.author : m.from // Buat tambahan aja.
    //  <----- Fungsi Database -----> Tambahin sendiri jika perlu.
    try {
      let user = global.db.data.users[m.sender];
      if (typeof user !== 'object')
        global.db.data.users[m.sender] = {};
      if (user) {
        if (!user.registered) {
          if (!('name' in user))
            user.name = users.pushname;
          if (!isNumber(user.age))
            user.age = -1;
          if (!isNumber(user.regTime))
            user.regTime = -1;
          if (!("premium" in user))
            user.premium = false;
        }
        if (!"banned" in user)
          user.banned = false;
        if (!"mute" in user)
          user.mute = false;
        if (!"afkReason" in user)
          user.afkReason = "";
        if (!("registered" in user))
          user.registered = false;
        if (!("lastIstigfar" in user))
          user.lastIstigfar = true;
        if (!isNumber(user.healt))
          user.healt = 0;
        if (!isNumber(user.stamina))
          user.stamina = 100;
        if (!isNumber(user.level))
          user.level = 0;
        if (!isNumber(user.exp))
          user.exp = 0;
        if (!isNumber(user.limit))
          user.limit = 10;
        if (!isNumber(user.lastclaim))
          user.lastclaim = 0;
        if (!isNumber(user.money))
          user.money = 0;
        if (!isNumber(user.premiumTime))
          user.premiumTime = 0;
        if (!isNumber(user.warn))
          user.warn = 0;
        if (!isNumber(user.afk))
          user.afk = -1;
      } else
        global.db.data.users[m.sender] = {
          name: users.pushname,
          age: -1,
          regTime: -1,
          premium: false,
          premium: false,
          banned: false,
          mute: false,
          afkReason: "",
          registered: false,
          lastIstigfar: true,
          healt: 100,
          stamina: 100,
          level: 0,
          exp: 0,
          limit: 10,
          lastclaim: 0,
          money: 0,
          premiumTime: 0,
          warn: 0,
          afk: -1
        };
    } catch (e) {
      console.log("DATABASE RUSAK", e);
    }

    // Untuk akses plugins kamu
    let isGroup = m.from.endsWith("@g.us");
    let isROwner = [...global.owner.map(([number]) => number)].map((v) => v?.replace(/[^0-9]/g, "") + '@c.us').includes(isGroup ? m.author : m.from);
    let isOwner = isROwner || m.fromMe;
    let participants = isGroup ? (await m.getChat()).participants : [];
    let AdminFilter = isGroup ? participants.filter(v => v.isAdmin).map(v => v.id.user) : '';
    let isAdmin = isGroup ? AdminFilter.map(v => v.replace(/[^0-9]/g, '') + '@c.us').includes(m.author ? m.author : m.from) : '';
    let isBotAdmin = isGroup ? AdminFilter.map(v => v.replace(/[^0-9]/g, '') + '@c.us').includes(conn.info.me._serialized) : '';
    const isPrems = isROwner || global.db.data.users[m.sender].premium == true;
    // Untuk menjalankan plugin prefix dan cmd kamu
    let usedPrefix;
    for (let name in global.plugins) {
      let plugin = global.plugins[name];
      if (!plugin)
        continue;
      const str2Regex = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
      let _prefix = plugin.customPrefix ? plugin.customPrefix : /./ //conn.prefix ? conn.prefix : global.prefix;
      let match = (
        _prefix instanceof RegExp // RegExp Mode?
          ? [[_prefix.exec(m.body), _prefix]]
          : Array.isArray(_prefix) // Array?
            ? _prefix.map((p) => {
              let re = p instanceof RegExp // RegExp in Array?
                ? p
                : new RegExp(str2Regex(p));
              return [re.exec(m.body), re];
            })
            : typeof _prefix === "string" // String?
              ? [
                [
                  new RegExp(str2Regex(_prefix)).exec(m.body),
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
          m,
          __dirname: ___dirname,
          __filename
        })) continue;
      }
      if (typeof plugin !== 'function') continue;

      if ((usedPrefix = (match[0] || "")[0])) {
        let noPrefix = m.body.replace(usedPrefix, "");
        let [command, ...args] = noPrefix.trim().split` `.filter((v) => v);
        args = args || [];
        let _args = noPrefix.trim().split` `.slice(1);
        let text = _args.join` `;
        command = (command || "").toLowerCase();
        let fail = plugin.fail || global.dfail; // <----- Jika ditolak ----->
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
        m.plugin = name;

        // // <----- Fungsi untuk pengecualian akses plugin Command ----->
        if (plugin.rowner && !isROwner) {
          fail('rowner', m, conn);
          continue;
        }
        if (plugin.owner && !isOwner) {
          fail('owner', m, conn);
          continue;
        }
        if (plugin.premium && !isPrems) {
          fail('premium', m, this);
          continue;
        }
        if (plugin.group && !isGroup) {
          fail("group", m, conn);
          continue;
        }
        else if (plugin.admin && !isAdmin) {
          fail('admin', m, conn);
          continue;
        }
        else if (plugin.botAdmin && !isBotAdmin) {
          fail('botAdmin', m, conn);
          continue;
        }
        if (plugin.private && isGroup) {
          fail('private', m, conn);
          continue;
        }

        m.isCommand = true;
        m.exp = 1
        let xp = 'exp' in plugin ? parseInt(plugin.exp) : 3; // <----- EXP yang didapat per Command ----->
        if (xp > 200)
          m.reply('ɴɢᴇᴄɪᴛ -_-'); // // <----- Jika EXP didapat melebihi 200 ----->
        else
          m.exp += xp;
        if (!isPrems && plugin.limit && global.db.data.users[m.sender].limit < plugin.limit * 1) {
          this.reply(m.chat, `[❗] ʟɪᴍɪᴛ ᴀɴᴅᴀ ʜᴀʙɪꜱ, ꜱɪʟᴀʜᴋᴀɴ ʙᴇʟɪ ᴍᴇʟᴀʟᴜɪ *${usedPrefix}buy limit*.`, m);
          continue;
        } // // <----- Jika limit habis ----->
        let extra = {
          match,
          usedPrefix,
          noPrefix,
          _args,
          args,
          command,
          text,
          conn: this,
          m,
          users,
          isGroup,
          isAdmin,
          isPrems
        };
        try {
          await plugin.call(this, m, extra);
          if (!isPrems)  m.limit = m.limit || plugin.limit || false;
        } catch (e) {
          
          console.error(e);
          if (e) { // Jika terjadi error Kode
            let text = format(e);
            m.reply(`ERROR... Tanya sama owner ae...`)
            for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
              m.error(jid + '@c.us', `*🗂️ Plugin:* ${m.plugin}\n*👤 Sender:* ${m.sender}\n*💬 Chat:* https://wa.me/${m.sender.replace('@s.whatsapp.net','')}\n*💻 Command:* ${usedPrefix}${command} ${args.join(' ')}\n📄 *Error Logs:*\n\n\`\`\`${text}\`\`\``.trim(), { quoted: m})
            }
          }
        
        } finally {
          if (typeof plugin.after === 'function') {
            try {
              await plugin.after.call(this, m, extra);
            } catch (e) {
              console.error(e);
            }
          }
          if (m.limit)
            m.reply(+m.limit + " ʟɪᴍɪᴛ ᴛᴇʀᴘᴀᴋᴀɪ ✔️");
        }
        break;
      }
    }
  } catch (e) {
    console.error(e);
  } finally {
    let user, stats = global.db.data.stats;
    if (m) {
      if (users.number && (user = global.db.data.users[m.sender])) {
        user.exp += m.exp;
        user.limit -= m.limit * 1;
      }


      if (m.plugin) {
        if (!isNumber(stats.total))
          stats.total = 0;
        if (!isNumber(stats.success))
          stats.success = 0;
        if (!isNumber(stats.failed))
          stats.failed = 0;
      } else {
        stats = {
          total: 0,
          success: 0,
          failed: 0
        };
      }
      stats.total += 1;
      if (m.error == null) {
        stats.success += 1;
      } else {
        stats.failed += 1;
      }

    }
    // Hasil dilihat pada console.log
    await (await import(`./lib/print.js`)).default(conn, m)
  }
}

global.dfail = (type, m, conn) => {
    let gambar =  ('./tmp/access_ditolak.jpg')
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
    if (msg) return conn.sendMessage(m.from, gambar ,{caption: msg}) 
  }


/*============== JANGAN DIUBAH ==============*/
let fileP = fileURLToPath(import.meta.url)
fs.watchFile(fileP, async () => {
    fs.unwatchFile(fileP)
    console.log(`Update File "${chalk.yellowBright(fileP)}"`)
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
