async function handler(m, { conn, args, usedPrefix, command }) {
  const quoted = await m.getQuotedMessage();
  if (!quoted)
    return m.reply(`QMasukkan pesan BroadCast:\n${usedPrefix + command} Ini uji coba broadcast.`);
  const chatsArr = await conn.getChats();
  for (let chats of chatsArr) {
    await quoted.forward(chats);
  }
}

 handler.help = ['broadcast'].map(v => v + ` [pesan]`)
 handler.tags = ['owner']
 handler.command = /^(bc|broadcast)$/i

 handler.owner = true

 export default handler;
