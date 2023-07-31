import syntaxerror from "syntax-error";
import { format } from "util";
import { createRequire } from "module";
const require = createRequire(import.meta.url)
let handler = async (m, _2) => {
  let { conn, usedPrefix, noPrefix, args, participants } = _2;
  let _return;
  let _syntax = "";
  let _text = (/^=/.test(usedPrefix) ? "return " : "") + noPrefix;
  let old = m.exp * 1;
  try {
    let i = 15;
    let f = {
      exports: {},
    };
    let exec = new (async () => {}).constructor(
      "print",
      "m",
      "handler",
      "require",
      "conn",
      "Array",
      "process",
      "args",
      "participants",
      "module",
      "exports",
      "argument",
      _text
    );
    _return = await exec.call(
      conn,
      (...args) => {
        if (--i < 1) return;
        console.log(...args);
        return m.reply(format(...args));
      },
      m,
      handler,
      require,
      conn,
      CustomArray,
      process,
      args,
      participants,
      f,
      f.exports,
      [conn, _2]
    );
  } catch (e) {
    let err = await syntaxerror(_text, "Execution Function", {
      allowReturnOutsideFunction: true,
      allowAwaitOutsideFunction: true,
    });
    if (err) _syntax = "```" + err + "```\n\n";
    _return = e;
  } finally {
    m.reply(_syntax + format(_return));
    m.exp = old;
  }
};
handler.help = ["> ", "=> "];
handler.tags = ["advanced"];
handler.customPrefix = /^=?> /;
handler.command = /(?:)/i;
handler.rowner = true;

export default handler;

class CustomArray extends Array {
  constructor(...args) {
    if (typeof args[0] == "number") return super(Math.min(args[0], 10000));
    else return super(...args);
  }
}
