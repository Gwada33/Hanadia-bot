const Discord = require('discord.js')
const { TOKEN, TOKEN1, TOKEN2 } = require('./config')
const { SlashCommandBuilder } = require('@discordjs/builders')
const Client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS, 
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
  ],
})

 var prefix = "h/"

var ping = new SlashCommandBuilder()
.setName("ping")
.setDescription("Ping du bot")


Client.on('ready', function () {
  Client.application.commands.create(ping)
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

Client.on("messageCreate", message => {
  if(message.author.bot) return
    if(message.content === prefix + "clear"){
      var number = message.content.slice(8)
      console.log(number)
      if(number < 1 || number > 100){
        message.reply({content: "Tu ne peux supprimer de message avec la valuer **" + number + "**, sa ne peux que etre entre 1 et 100", ephemeral: true})
        if(number == NaN){
          message.reply({content: 'Not a Number', ephemeral: true})
        }
      } else {
        message.channel.bulkDelete(number)
        message.reply({content: "Tu as supprimer **" + number + "** messages", ephemeral: true})
      }
    }
})

console.log(TOKEN + TOKEN1 + TOKEN2)

//Client.login(TOKEN + TOKEN1 + TOKEN2)