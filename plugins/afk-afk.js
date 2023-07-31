  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
let handler = async ( m, { text } ) =>
{
    let user = global.db.data.users[m.sender]
    user.afk = +new Date
    user.afkReason = text
    let afkmode = pickRandom([' ✿.｡.:* 𝒜𝐹𝒦 𝑀𝒪𝒟𝐸 *.:｡.✿', '╰☆☆ ₐFK MₒDₑ ☆☆╮', '░▒▓█ 【A】【F】【K】 【M】【O】【D】【E】 █▓▒░', '▁ ▂ ▄ ▅ ▆ ▇ █ 〜A∿F∿K∿ ∿M∿O∿D∿E〜 █ ▇ ▆ ▅ ▄ ▂ ▁', '【☆】★【☆】★【𝒜𝐹𝒦 𝑀𝒪𝒟𝐸】★【☆】★【☆】' , '.•♫•♬• Å⫶F̊⫶K̊⫶ M̊⫶O̊⫶D̊⫶E̊⫶ •♬•♫•.', '꧁༒☬ A̴F̴K̴ ̴M̴O̴D̴E̴ ☬༒꧂', '§.•¨°÷•..× AFK MODE ×,.•¨°÷•..§', '░▒▓█►─═  ᴀꜰᴋ ᴍᴏᴅᴇ ═─◄█▓▒░', ' ✴  🎀  𝒜𝐹𝒦 𝑀❁𝒟𝐸  🎀  ✴', '꧁𓊈𒆜 ƎᗡOW ⋊Ⅎ∀ 𒆜𓊉꧂', '•´¯`•. A͎͍͐￫F͎͍͐￫K͎͍͐￫ M͎͍͐￫O͎͍͐￫D͎͍͐￫E͎͍͐￫ .•´¯`•'])
 
  m.reply( `${ afkmode}

  ╭[ *★彡[ᴋᴀᴍᴜ ꜱᴇᴋᴀʀᴀɴɢ ᴀꜰᴋ]彡★* ]✧
  ┆ *Nama*   : ${m.pushName}
  ┆ *Alasan* : ${user.afkReason ? '' + user.afkReason : ''}
  ╰┅────────★`)
}
handler.help = ['afk [alasan]']
handler.tags = [ 'main' ]
handler.register = true
handler.command = /^afk$/i


handler.login = true
handler.text = true
export default handler 