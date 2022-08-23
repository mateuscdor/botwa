class jokeimg {
  constructor(sock, sender) {
    fetch('https://candaan-api.vercel.app/api/image/random')
    .then((response) => response.json())
    .then((data) => {
      sock.sendMessage(sender, {
        image: data.data,
        caption: "😅😅"
      })
    })
  }
}

module.exports = jokeimg