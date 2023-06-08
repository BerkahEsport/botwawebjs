import fetch from 'node-fetch';
let handler = async (m, { args, usedPrefix, command, text }) => {
let v = await (await fetch(`https://xzn.wtf/api/oploverz/ongoing?apikey=${global.RestAPI.xzn.apikey}`)).json()
    let str = '*Anime Update*' + '\n\n'
    for (let i = 0; i < v.length; i++) {
      str += "Title: " + v[i].title + '\n'
      str += "Episode: " + v[i].episode + '\n'
      str += "Type: " + v[i].type + '\n'
      str += "score: " + v[i].score + '\n'
      str += "status: " + v[i].status + '\n'
      str += "link: " + v[i].link + '\n\n'
    }
    m.reply(str)

}

handler.help = ['animeongoing']
handler.tags = ['anime']
handler.command = /^animeongoing$/i
handler.register = true


handler.login = true
handler.text = true
export default handler 