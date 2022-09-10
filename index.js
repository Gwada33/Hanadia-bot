const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const Client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS, 
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
  ],
})


var ping = new SlashCommandBuilder()
.setName("ping")
.setDescription("Ping du bot")

var clear = new SlashCommandBuilder()
.setName("clear")
.setDescription("Clear un nombre de messages défini")
.addIntegerOption(option => 
  option
  .setDescription("Nombre de messages")
  .setRequired(true))

Client.on('ready', function () {
  Client.application.commands.create(ping)
  Client.application.commands.create(clear)
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

Client.on("interactionCreate", interaction => {
  if(interaction.isCommand()){
    if(interaction.commandName == "clear")
    if(!interaction.member.permissions.has("MANAGE_MESSAGES")){
      interaction.reply({content: "Tu n'as pas les permissions requise pour executer cette commande", ephemeral: true});
    } else{
      var number = interaction.options.getInteger()
      if(number < 1 || number > 100){
        interaction.reply({content: "Tu ne peux supprimer de message avec la valuer **" + number + "**, sa ne peux que etre entre 1 et 100", ephemeral: true})
      } else {
        interaction.channel.bulkDelete(number)
        interaction.reply({content: "Tu as supprimer **" + number + "** messages", ephemeral: true})
      }
    }
  }
})

Client.login("MTAxNzkxNzg0MDcxMzU5Njk3OA.GJlYT_.IXR9dEgiFVkfYcF-YLrDvH0hHXRKkuUBUeHOAU")