const Discord = require('discord.js')
const Client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS, 
  ],
})

Client.on('ready', function () {
  console.log("Je suis connecté !")
})


Client.login("MTAxNzkxNzg0MDcxMzU5Njk3OA.GJlYT_.IXR9dEgiFVkfYcF-YLrDvH0hHXRKkuUBUeHOAU")