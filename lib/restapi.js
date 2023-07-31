import fs from 'fs';
import { fileURLToPath } from "node:url";
export default {
restapi: {
    lol: 'https://api.lolhuman.xyz/',
    xzn: 'https://xzn.wtf/'
  },
apikey: {
    'https://api.lolhuman.xyz': 'beta',
    'https://xzn.wtf/': 'beta'
  }
}
// <=== CONTOH ===>
//let json = await fetch(global.API(`xzn`,`api/openai`,{text: m.text},`apikey`))

//------ JANGAN DIUBAH -----
let fileP = fileURLToPath(import.meta.url)
fs.watchFile(fileP, () => {
fs.unwatchFile(fileP)
console.log(`Update File "${fileP}"`)
import(`${import.meta.url}?update=${Date.now()}`)
})