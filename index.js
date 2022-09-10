const Discord = require('discord.js')
const { SlashCommandBuilder } = require('discord.js')
const Client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS, 
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
  ],
})


var data2 = new SlashCommandBuilder()
.setName("ping")
.setDescription("Ping du bot")


Client.on('ready', function () {
  Client.application.commands.create(data2)
  console.log("Je suis connecté !")
})

Client.on("interactionCreate", interaction => {
  if(interaction.isCommand()){
    if(interaction.commandName === "ping"){
      var ping = Client.ws.ping
      const embeds = new Discord.MessageEmbed()
      .setTitle("Le ping du bot est **" + ping + "** ms")
      interaction.reply({embeds: [embeds]})
    }
  }
})


Client.login("MTAxNzkxNzg0MDcxMzU5Njk3OA.GJlYT_.IXR9dEgiFVkfYcF-YLrDvH0hHXRKkuUBUeHOAU")