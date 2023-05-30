// Yang jual SC ini gw doain hidup sengsara. SC ini gw bagiin gratis jangan diperjualbelikan.
// Donate: 0895371549895


import './config.js';
import { format } from 'util';
import fs from 'fs';

import { fileURLToPath } from "node:url"
var isNumber = x => typeof x === 'number' && !isNaN(x);
export async function handler(m) {
  if (!m)
    return;
  let chats = await m.getChat();
  let users = await m.getContact();
  try {
    //m = m || smsg(this, m)
    //  <----- Fungsi Database -----> Tambahin sendiri jika perlu.
    try {
      let user = global.db.data.users[m.author || m.from];
      if (typeof user !== 'object')
        global.db.data.users[m.author || m.from] = {};
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
        global.db.data.users[m.author || m.from] = {
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
    let isROwner = [this.info.me.user, ...global.owner.map(([number]) => number)].map((v) => v?.replace(/[^0-9]/g, "")).includes((isGroup ? m.author : m.from).split("@")[0]);
    let isOwner = isROwner || m.fromMe;
    let participants = isGroup ? (await m.getChat()).participants : [];
    let AdminFilter = isGroup ? participants.filter(v => v.isAdmin).map(v => v.id.user) : '';
    let isAdmin = isGroup ? AdminFilter.map(v => v.replace(/[^0-9]/g, '') + '@c.us').includes(m.author ? m.author : m.from) : '';
    let isBotAdmin = isGroup ? AdminFilter.map(v => v.replace(/[^0-9]/g, '') + '@c.us').includes(conn.info.me._serialized) : '';
    const isPrems = isROwner || global.db.data.users[m.author || m.from].premium == true;
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
        let xp = 'exp' in plugin ? parseInt(plugin.exp) : 3; // <----- EXP yang didapat per Command ----->
        if (xp > 200)
          m.reply('ɴɢᴇᴄɪᴛ -_-'); // // <----- Jika EXP didapat melebihi 200 ----->

        else
          m.exp += xp;
        if (!isPrems && plugin.limit && global.db.data.users[m.author || m.from].limit < plugin.limit * 1) {
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
          m.error = e;
          console.error(e);
          if (e) { // Jika terjadi error Kode
            let text = format(e);
            for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
              m.reply(`Fitur ERROR, laporkan Pemilik BOT. \n*🗂️ Plugin:* ${m.plugin}\n*👤 Pengirim:* ${(isGroup ? m.author : m.from).replace('@c.us', '')}\n*💬 Chat Owner:* https://wa.me/${jid}\n*💻 Command:* ${usedPrefix}${command} ${args.join(' ')}\n📄 *Error Logs:*\n\n\`\`\`${text}\`\`\``.trim());
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
      if (users.number && (user = global.db.data.users[m.author || m.from])) {
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
    if (msg) return conn.sendFilePath(m.from, gambar ,msg) 
  }


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


let fileP = fileURLToPath(import.meta.url)
fs.watchFile(fileP, () => {
    fs.unwatchFile(fileP)
    console.log(`Update File "${fileP}"`)
    import(`${import.meta.url}?update=${Date.now()}`)
})