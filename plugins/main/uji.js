let handler = async (m, { conn ,args, usedPrefix, command }) => {
m.reply(`OK Bro...`)

    }
  
    handler.help = ['uji']
    handler.tags = ['main']
    handler.command = /^(uji)$/i
    handler.register = true
    export default handler

  