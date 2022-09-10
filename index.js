const Discord = require('discord.js')
const Client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS, 
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
  ],
})

Client.on('ready', function () {
  console.log("Je suis connecté !")
})

Client.on('message', message => {
  if(message.author.bot) return
  if (message.content === 'ping') {
    message.reply('pong !')
  }
})

Client.login("MTAxNzkxNzg0MDcxMzU5Njk3OA.GJlYT_.IXR9dEgiFVkfYcF-YLrDvH0hHXRKkuUBUeHOAU")