import fetch from "node-fetch"
let handler = async (m, { conn }) => {

    let update = Number(new Date) //Timestamp
    let user = global.db.data.users[m.sender]
    let {name, level} = user
    let pp = global.logo.thumb
	let who = m.sender
	try {
	  pp = await conn.getProfilePict(who)
	} catch (e) {
	
	} finally {
        if (user.registered === true) {
        if (user.logged === false) {
            user.logged = true
            user.login = update
            user.money += 1000
let teks = `❖『 *ʟᴏɢɪɴ* 』❖

👤 *ɴᴀᴍᴀ:* ${name}
🧬 *ʟᴇᴠᴇʟ:* ${level}
💰 *ᴍᴏɴᴇʏ:* ${user.money }
⌛ *ᴛᴇʀᴀᴋʜɪʀ ʟᴏɢɪɴ:* ${new Date(user.login).toLocaleString()}

ʟᴏɢɪɴ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ...`
              conn.sendFile(m.chat, await(await fetch(pp)).buffer().catch( _ => readFileSync(pp)), '', teks.trim(), m)


        } else {    conn.sendFile(m.chat, await(await fetch(pp)).buffer().catch( _ => readFileSync(pp)), '', `ᴋᴀᴍᴜ ꜱᴜᴅᴀʜ ʟᴏɢɪɴ ʜᴀʀɪ ɪɴɪ...`, m)
                  } }
                  else { 
                    conn.sendFile(m.chat, await(await fetch(pp)).buffer().catch( _ => readFileSync(pp)), '', `ᴀɴᴅᴀ ʙᴇʟᴜᴍ ᴛᴇʀᴅᴀꜰᴛᴀʀ ꜱɪʟᴀʜᴋᴀɴ ᴅᴀꜰᴛᴀʀ ᴛᴇʀʟᴇʙɪʜ ᴅᴀʜᴜʟᴜ.`, m)
                 }  
                }
            }
handler.command = /^(login)$/i
handler.register = true
export default handler 