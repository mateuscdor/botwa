class menu {
  constructor(sock, sender) {
    const sections = [
      {
	      title: "Section 1",
	      rows: [
	        {title: "fury_indonesia", rowId: "1", description: "Solid Solid Solid!!!"},
	        {title: "halo", rowId: "2", description: "nyapa"}
	      ]
      },
        ]
    sock.sendMessage(sender, {
          text: "ini menu..",
          title: "menu",
          buttonText: "tampilkan menu",
          sections
        })
  }
}

module.exports = menu;