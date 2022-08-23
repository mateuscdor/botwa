class halo {
  constructor(sock, sender, nama) {
    sock.sendMessage(sender, {
      text: "halo "+nama+", kenafa?"
    })
  }
}

module.exports = halo;