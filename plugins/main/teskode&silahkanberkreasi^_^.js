let handler = async (m, { args, usedPrefix, command, text }) => {
	//if (!text) return m.reply(`${usedPrefix + command} link`); // Jika tidak ada teks maka kamu jawab apa?
    // <===== PESAN =====>
	m.reply(`Berhasil dijawab...`) // Jawab dari bot bentuk teks.
	conn.reply(m.chat, 'Pesan dengan tujuan nomor tertentu berhasil...', m)
	conn.sendFile(m.chat, thumb, '', 'Logo *berkahesport.id* ...', m) // Mengirim gambar/video beserta teks...
	conn.sendAd(m.chat, thumb, '*AD Reply* berhasil dibuat...', m) // Untuk mengirim pesan AdReply
	
	
	// <===== Buat Test JSON file (REST API) ====>
	let json = 'https://cataas.com/cat?json=true'
	conn.json(m.chat, json) // Untuk melihat file json menjadi teks...


	// <===== DEFAULT PESAN =====>
	//conn.sendMessage('nomor tujuan (@c.us)', 'link gambar/video', { caption: 'Teks disini', quoted: m})
	conn.sendMessage(m.chat, 'https://telegra.ph/file/a46ab7fa39338b1f54d5a.mp4', { caption: 'Video berhasil dikirim...', quoted: m})
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