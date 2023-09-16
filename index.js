import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'node:fs'
import cfonts from 'cfonts';
import { createInterface } from 'readline'
import yargs from 'yargs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const { say } = cfonts
const rl = createInterface(process.stdin, process.stdout)

say('BOTWAWEBJS', {
  font: 'block',
  align: 'center',
  gradient: ['#FFA500', 'yellow']
})

var isRunning = false
/**
 * Start a js file
 * @param {String} file `path/to/file`
 */
function start(file) {
  if (isRunning) return
  isRunning = true
  let args = [join(__dirname, file), ...process.argv.slice(2)]
  say([process.argv[0], ...args].join(' '), {
    font: 'console',
    align: 'center',
    colors: ['white']
  })

  setupMaster({
    exec: args[0],
    args: args.slice(1),
  })
  let p = fork()
  p.on('message', data => {
    console.log('[DITERIMA]', data)
    switch (data) {
      case 'reset':
        p.process.kill()
        isRunning = false
        start.apply(this, arguments)
        break
      case 'uptime':
        p.send(process.uptime())
        break
    }
  })
  p.on('exit', (_, code) => {
    isRunning = false
    console.error('[❗] Keluar kode:', code)
    if (code !== 0) start("main-linking.js")
		watchFile(args[0], () => {
			unwatchFile(args[0])
			start("main-linking.js")
		})
    })
  
  let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
  if (!opts['test'])
    if (!rl.listenerCount()) rl.on('line', line => {
      p.emit('message', line.trim())
    })
}

start('main-linking.js') //Jika mau scan QR-Code ganti jadi main-qr.js