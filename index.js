const { default: makeWASocket, DisconnectReason, useSingleFileAuthState } = require("@adiwajshing/baileys");
const {Boom} = require("@hapi/boom");
const { state, saveState } = useSingleFileAuthState("./session.json")
const { say } = require("cfonts")
const fs = require("fs")
const moment = require("moment")
const pino = require("pino")
// const Drips = require("drips-memes")
// const {color} = require("./lib/color")
say(`BOT-IKHSAN\nV1`, {
    font: '3d',
    colors: ["#0ff",'green',"#ff0"],
    align: 'center',
    gradient: false,
    background: "transparent",
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLenght: '0'

  })
  say(`IKHSAN-BOT By IKHSAN`, {
    font: 'console',
    align: 'center',
    gradient: ['red', 'green']
  })
console.log("bot berjalan pada "+moment().format('MMMM Do YYYY'))
function bot () {
  const sock = makeWASocket({
        printQRInTerminal: true,
        logger: pino({ level: "silent" }),
        auth: state,
        browser: ["ikhsan bot", "Safari", "3.0"]
    })
    sock.ev.on("creds.update", saveState)
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update
        if(connection === 'close') {
            const shouldReconnect = (lastDisconnect.error = Boom)?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
            // reconnect if not logged out
            if(shouldReconnect) {
                bot()
            }
        } else if(connection === 'open') {
            console.log('koneksi terbuka!')
        }
    })
    sock.ev.on("messages.upsert",
    ({
      messages,
      type
    })=>{
      let pesan;
      let sender = messages[0].key.remoteJid;
      const me = messages[0].key.fromMe;
      let listRespon;
      const lihat = {
        remoteJid: sender,
        id: messages[0].key.id,
        participant: messages[0].key.participant
      }
      if(messages[0].message || me){
        // console.log(messages[0])
        pesan = messages[0].message.conversation;
        say(`ada pesan dari ${sender} \npesannya ${pesan} , tipenya ${type} \ndari aku : ${me}`, {
          font: "console",
          colors: ["green"]
        })
        sock.readMessage([lihat])
        
        if(pesan){
          if(fs.readFileSync('./command/'+pesan+'.js')){
            const cmd = require('./command/'+pesan)
            if(pesan === "halo"){
              const nama = messages[0].pushName
              new cmd(sock, sender, nama)
            }else {
              new cmd(sock, sender)
            }
          }
        }
      }
      if(sender === "status@broadcast" || me) return;
      if(messages[0].message.listResponseMessage){
        listRespon = messages[0].message.listResponseMessage;
        if(fs.readFileSync("./respon/"+listRespon.title+".js")){
          const responMsg = require("./respon/"+listRespon.title)
          new responMsg(sock, sender)
      }
      
    }
    })
}
bot()
