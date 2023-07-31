import { createHash } from 'crypto'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i


let handler = async ( m, { text, usedPrefix, command } ) =>
{
	let pp = global.logo.thumb
	let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
	try {
	  pp = await conn.getProfilePict(who)
	} catch (e) {
	
	} finally {
const belumdaftar = `"▢- - - - - ᴅᴀꜰᴛᴀʀ - - - - -"

=> *ɴᴀᴍᴀ ᴀɴᴅᴀ:* ${ await conn.getName( m.sender ) }
<❔> Ingin mendaftar dengan nama sendiri? Silahkan ketik *${ usedPrefix + command } nama.umur*
		
${global.wm.bot}`.trim()

	let user = global.db.data.users[ m.sender ]
	if ( user.registered === true )
		throw (`[💬] Kamu sudah terdaftar\nMau daftar ulang? *${ usedPrefix }unreg [SERIAL NUMBER]*`)
	if ( !Reg.test( text ) )
		return conn.reply( m.chat, belumdaftar, m )
	let [ _, name, splitter, age ] = text.match( Reg )
	if ( !name )
		throw ('Nama tidak boleh kosong (Alphanumeric)')
	if ( !age )
		throw ('Umur tidak boleh kosong (Angka)')
	age = parseInt( age )
	if ( age > 30 )
		throw ('WOI TUA (。-`ω´-) \n\nᴜᴅᴀʜ ᴛᴜᴀ ʙᴀɴʏᴀᴋɪɴ ɪʙᴀᴅᴀʜ ᴊᴀɴɢᴀɴ ᴍᴀɪɴᴀɴ ᴍᴜʟᴜ!!!')
	if ( age < 5 )
		throw ('Halah dasar bocil')
		
	user.money = 0
	user.name = name.trim()
	user.age = age
	user.regTime = +new Date
	user.registered = true
	user.logged = true
	user.login = Number(new Date)
	let sn = createHash( 'md5' ).update( m.sender ).digest( 'hex' )

let cap = `
┏─• *ɴᴀᴍᴀ ᴘᴇɴɢɢᴜɴᴀ ʙᴏᴛ*
│▸ *sᴛᴀᴛᴜs:* ☑️ ʙᴇʀʜᴀꜱɪʟ
│▸ *ɴᴀᴍᴀ:* ${ name }
│▸ *ᴜᴍᴜʀ:* ${ age } ᴛᴀʜᴜɴ
│▸ *sɴ:* ${ sn }
┗────···

ᴅᴀᴛᴀ ɴᴀᴍᴀ ᴘᴇɴɢɢᴜɴᴀ ʙᴏᴛ ʏᴀɴɢ ᴛᴇʀsɪᴍᴘᴀɴ ᴅɪᴅᴀᴛᴀʙᴀsᴇ ʙᴏᴛ, ᴅɪᴊᴀᴍɪɴ ᴀᴍᴀɴ ᴛᴀɴᴘᴀ ᴛᴇʀsʜᴀʀᴇ (. ❛ ᴗ ❛.)
`.trim()
	conn.sendFile(m.chat, pp, '', cap, m)
}
}
handler.help = ['daftar'].map(v => v + ' [nama].[umur]')
handler.tags = ['main']

handler.command = /^(daftar|verify|reg(ister)?)$/i
 

handler.text = true
export default handler 