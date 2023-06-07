let handler = async (m, { args, usedPrefix, command, text }) => {
	if (!args) return m.reply(`${usedPrefix + command} link`); // Jika tidak ada teks maka kamu jawab apa?
    m.reply(`Berhasil dijawab...`) // Jawab dari bot bentuk teks.
	conn.sendMessage(m.chat, 'https://telegra.ph/file/a46ab7fa39338b1f54d5a.mp4', { quoted: m}) // Jawab dari bot bentuk Gambar / Video.
	
	

	// <===== Buat Test JSON file ====>
	let json = { "code":0,
	"msg":"success",
	"processed_time":0.3122,
	"data": {"id":"7189917930761506075",
	"region":"ID","title":"",
	"cover":"https://p16-sign-va.tiktokcdn.com/obj/tos-useast2a-p-0037-aiso/10b2f36b59d34da9bd06c10d19c32301_1674033227?x-expires=1685408400&x-signature=oGoD0Yu9v0i53fM4LFZJyPDCHF8%3D&s=AWEME_DETAIL&se=false&sh=&sc=dynamic_cover&l=202305290157360D50707B071C52778564"}}
	conn.json(m.chat, json) // Untuk melihat file json menjadi teks...

	conn.sendAd(m.chat, thumb, ty, m) // Untuk mengirim pesan AdReply
}

handler.help = [''] // Jika diisi maka di menu bot akan tampil, samakan dengan handler.command ya.
handler.tags = [''] // Jika diisi maka fitur ini akan dikelompokan sesuai dengan yang kamu isi.
handler.command = /^(tes)$/i // Ketika chat bot sama teksnya maka akan menjalankan fitur ini. (Diawali dengan prefix .)
// handler.rowner = true // Hanya bisa diakses Pemilik paling utama. Di file config.js
// handler.owner = true // Hanya bisa diakses Owner tambahan & Owner utama
// handler.group = true // Hanya bisa diakses di group
// handler.owner = true // Hanya bisa diakses oleh admin group
// handler.botAdmin = true // Hanya bisa diakses jika bot menjadi Admin group.
// handler.limit = true // Limit akan berkurang 1 setiap menjalankan fitur. [kata true bisa diganti angka sesuai keinginan misal 5]


export default handler;