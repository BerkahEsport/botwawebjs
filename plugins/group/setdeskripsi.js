let handler = async (m, { conn, usedPrefix, command, args, text }) => {
    	if (!text) return m.reply(`Masukkan teks:\n${usedPrefix + command} Halo selamat datang di group.`);
        	let chat = await m.getChat();
            	 await chat.setDescription(text).then(() => m.reply(`Berhasil merubah deskripsi group.`))
                 }

handler.help = ['setdesc'].map(v => v + ' [teks]')
handler.tags = ['group']
handler.command = /^set((desc(ription)?)?)$/i

handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler;
