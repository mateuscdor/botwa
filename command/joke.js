class jokes {
  #sock = null;
  #sender = null;
  constructor(sock, sender){
    this.#sock = sock;
    this.#sender = sender;
    fetch('https://candaan-api.vercel.app/api/text/random')
    .then((response) => response.json())
    .then((data) => {
      this.#sock.sendMessage(this.#sender, {
        text: data.data
      })
    })
  }
}

module.exports = jokes;