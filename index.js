const Discord = require('discord.js')
const Client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILDS_MESSAGES,
  ],
})