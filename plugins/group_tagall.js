let handler = async (m, { conn,args, participants }) => {
let tagall = pickRandom(['⺀T A G A L L - 𝙶 𝚁 O 𝚄 𝙿 ⺀','𝓣𝓐𝓖 𝓐𝓛𝓛 - 𝓖𝓡𝓞𝓤𝓟','𝕋𝔸𝔾 𝔸𝕃𝕃 - 𝔾ℝ𝕆𝕌ℙ','𝙏𝘼𝙂 𝘼𝙇𝙇 - 𝙂𝙍𝙊𝙐𝙋','ㄒ卂Ꮆ 卂ㄥㄥ - Ꮆ尺ㄖㄩ卩','𝚃̷𝙰̷𝙶̷ 𝙰̷𝙻̷𝙻̷ - 𝙶̷𝚁̷𝙾̷𝚄̷𝙿̷','ŤĂĞ ĂĹĹ - ĞŔŐÚР','ミ★ 𝘛𝘈𝘎 𝘈𝘓𝘓 - 𝘎𝘙𝘖𝘜𝘗 ★彡','꧁•⊹٭𝚃𝙰𝙶 𝙰𝙻𝙻 - 𝙶𝚁𝙾𝚄𝙿٭⊹•꧂','ıllıllı⭐🌟 T͙A͙G͙ A͙L͙L͙ - G͙R͙O͙U͙P͙ 🌟⭐ıllıllı','(◍•ᴗ•◍) ミ💖 ꜍T꜉꜍A꜉꜍G꜉ ꜍A꜉꜍L꜉꜍L꜉ ꜍-꜉ ꜍G꜉꜍R꜉꜍O꜉꜍U꜉꜍P꜉ 💖彡','෴❤️෴ T҉A҉G҉ ҉A҉L҉L҉ ҉-҉ ҉G҉R҉O҉U҉P҉ ෴❤️෴','◦•●❤♡ †ÄG ÄLL - GRÖÚþ ♡❤●•◦','彡(✿╹◡╹) 𝘛𝘈𝘎 𝘈𝘓𝘓 - 𝘎𝘙𝘖𝘜𝘗 (｀∀´)Ψ','☞ó ͜つò☞ 𝓣𝓐𝓖 𝓐𝓛𝓛 - 𝓖𝓡𝓞𝓤𝓟','(づ｡◕‿‿◕｡)づ тαg αℓℓ - gяσυρ ٩(˘◡˘)۶','(人◕‿◕) 𝕋𝔸𝔾 𝔸𝕃𝕃 - 𝔾ℝ𝕆𝕌ℙ (•◡•)','¸„.-•~¹°”ˆ˜¨ 丅ᗩĞ ａ𝓵𝕃 - Ꮆ𝐑๏𝐔ρ ¨˜ˆ”°¹~•-.„¸','▄︻デ𝔱ά𝔾 𝒶ⓁＬ - Ｇя𝔬ᑌ𝐏══━一','ıllıllı 丅𝓐Ğ 𝓪ᒪ𝐋 - Ꮆ𝔯𝐎Ｕ卩 ıllıllı','★彡[ᴛᴀɢ ᴀʟʟ - ɢʀᴏᴜᴘ]彡★','꧁༒☬𝓣𝓐𝓖 𝓐𝓛𝓛 - 𝓖𝓡𝓞𝓤𝓟☬༒꧂','▄︻デT̷A̷G̷ ̷A̷L̷L̷ ̷-̷ ̷G̷R̷O̷U̷P̷══━一','█▓▒­░⡷⠂ΓДG ДLL - GЯФЦP⠐⢾░▒▓█','꧁༺ȶǟɢ ǟʟʟ - ɢʀօʊք༻꧂','▀▄▀▄▀▄🅃🄰🄶 🄰🄻🄻 - 🄶🅁🄾🅄🄿▀▄▀▄▀▄','█▓▒­░⡷⠂ΓДG ДLL - GЯФЦP⠐⢾░▒▓█'])
let simbol = pickRandom( [ '➥', '→', '↝', '↣', '↪', '↬', '↳', '↷', '⇀', '⇉', '⇏', '⇛', '⇢', '⇝', '⇥', '⇨', '▶', '➔', '➙', '➜', '➛', '➝', '➞', '➟', '➠', '➡', '➢', '➣', '➤', '➦', '➧', '➨', '➩', '➪', '➫','➬','➭','➮','➯','➱','➲','➳','➵','➸','➺','➻','➼','➽','➾','⌦','⇰','⇸','⤨','⥸','⥅','⟴','⭃','⭆','⥤'])
let pesan = args.join` `
let oi = `*ɪꜱɪ ᴘᴇꜱᴀɴ:* ${pesan}`
let teks = `*${tagall}*\n\n❏ ${oi}\n\n❏ *ᴜꜱᴇʀ:*\n`
let mentions = participants.map(a => a.id._serialized)
for (let mem of participants) {
teks += `┣${simbol} @${mem.id._serialized.split('@')[0]}\n`}
teks += `*└*${global.wm.author}\n\n*▌│█║▌║▌║║▌║▌║▌║█*`
conn.sendMessage(m.chat, teks, { mentions })
}
handler.help = ['tagall [pesan]']
handler.tags = ['group']
handler.command = /^(tagall)$/i
handler.admin = true
handler.group = true

handler.login = true
handler.text = true
export default handler 

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}