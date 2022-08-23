class halo {
  constructor(sock, sender){
    sock.sendMessage(sender, {
      text: "hai apa 😅"
    })
  }
}

module.exports = halo;