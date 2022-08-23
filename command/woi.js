class woi {
  #sock = null;
  #sender = null
  constructor(sock, sender){
    this.#sock = sock;
    this.#sender = sender;
    this.#sock.sendMessage(this.#sender, {
      text: "hai"
    })
  }
}

module.exports = woi;