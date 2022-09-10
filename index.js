const Discord = require('discord.js')
const Clien = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS, 
  ],
})

bot.on('ready', function () {
  console.log("Je suis connecté !")
})


bot.login("MTAxNzkxNzg0MDcxMzU5Njk3OA.GJlYT_.IXR9dEgiFVkfYcF-YLrDvH0hHXRKkuUBUeHOAU")