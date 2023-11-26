export function before ( m )
{
    function pickRandom ( list )
    {
    return list[Math.floor(Math.random() * list.length)]
    }
    
    let user = global.db.data.users[ m.sender ]
    let afkmode = pickRandom([' ✿.｡.:* 𝒜𝐹𝒦 𝑀𝒪𝒟𝐸 *.:｡.✿', '╰☆☆ ₐFK MₒDₑ ☆☆╮', '░▒▓█ 【A】【F】【K】 【M】【O】【D】【E】 █▓▒░', '▁ ▂ ▄ ▅ ▆ ▇ █ 〜A∿F∿K∿ ∿M∿O∿D∿E〜 █ ▇ ▆ ▅ ▄ ▂ ▁', '【☆】★【☆】★【𝒜𝐹𝒦 𝑀𝒪𝒟𝐸】★【☆】★【☆】' , '.•♫•♬• Å⫶F̊⫶K̊⫶ M̊⫶O̊⫶D̊⫶E̊⫶ •♬•♫•.', '꧁༒☬ A̴F̴K̴ ̴M̴O̴D̴E̴ ☬༒꧂', '§.•¨°÷•..× AFK MODE ×,.•¨°÷•..§', '░▒▓█►─═  ᴀꜰᴋ ᴍᴏᴅᴇ ═─◄█▓▒░', ' ✴  🎀  𝒜𝐹𝒦 𝑀❁𝒟𝐸  🎀  ✴', '꧁𓊈𒆜 ƎᗡOW ⋊Ⅎ∀ 𒆜𓊉꧂', '•´¯`•. A͎͍͐￫F͎͍͐￫K͎͍͐￫ M͎͍͐￫O͎͍͐￫D͎͍͐￫E͎͍͐￫ .•´¯`•'])
  
    if (user.afk > -1) {
        m.reply(
      `     ${ afkmode}
      
      ╭[ *★彡[ᴋᴀᴍᴜ ʙᴇʀʜᴇɴᴛɪ ᴀꜰᴋ]彡★* ]✧
      ┆ *Alasan* : ${user.afkReason ? '' + user.afkReason : ''}
      ┆ *Selama* : ${(new Date - user.afk).toTimeString()}
      ╰┅────★`.trim())
        user.afk = -1
        user.afkReason = ''
    }
    let jids = [...new Set([...(m.mentions || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    for (let jid of jids) {
        let user = global.db.data.users[jid]
        if (!user)
            continue
        let afkTime = user.afk
        if (!afkTime || afkTime < 0)
            continue
        let reason = user.afkReason || ''
        m.reply(`${ afkmode}
      
      ╭[ *★彡[ᴊᴀɴɢᴀɴ ᴛᴀɢ ᴅɪᴀ]彡★* ]✧
      ┆ ${reason ? '*Alasan* : ' + reason : 'Tanpa Alasan'}
      ┆ *Selama* : ${(new Date - afkTime).toTimeString()}
      ╰┅────★`.trim())
    }
    return true
}