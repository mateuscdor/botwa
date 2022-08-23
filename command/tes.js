class tes {
  constructor(sock, sender){
    sock.sendMessage(sender, {
      text: "afa"
    })
  }
}

module.exports = tes;