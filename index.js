const Discord = require('discord.js')
const { TOKEN, TOKEN1, TOKEN2 } = require('./config')
const { SlashCommandBuilder } = require('@discordjs/builders')
const background = "https://cdn.discordapp.com/attachments/999010516238348390/1020439266171572354/Nouveau_projet_7.png"
const Canvas = require("canvas")
const ytdl = require("ytdl-core")
const Voice = require("@discordjs/voice")
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require("@discordjs/voice")
const axios = require("axios")

const Client = new Discord.Client({
  shards: 'auto',
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

var help = new SlashCommandBuilder()
.setName("help")
.setDescription("Help du bot")


var clear = new SlashCommandBuilder()
.setName("clear")
.setDescription("Clear un  nombre des msg défini")
.addIntegerOption(option => 
  option.setName("number")
  .setDescription("Number des nombre des messages")
  .setRequired(true)
  )
  
var ban = new SlashCommandBuilder()
.setName("ban")
.setDescription("Ban un joueur du serveur")
.addUserOption((option) => option
   .setName("joueur")
   .setDescription("joueur du serveur à ban")
   .setRequired(true)
   )
.addStringOption(option => 
  option
  .setName("raison")
  .setDescription("raison du ban")
  .setRequired(true)
  )   

  var kick = new SlashCommandBuilder()
  .setName("kick")
  .setDescription("Kick un joueur du serveur")
  .addUserOption((option) => option
     .setName("membre")
     .setDescription("Joueur du serveur à kick")
     .setRequired(true)
     )
  .addStringOption(option => 
    option
    .setName("reason")
    .setDescription("Raison du kick")
    .setRequired(true)
    )   
 
var tcommand = new SlashCommandBuilder()
.setName("tcommand")
.setDescription("Testez une commande autre que celmle de base")

var saymp = new SlashCommandBuilder()
.setName("saymp")
.setDescription("Envoyer un message à un joueur du serveur")
.addUserOption((option) => option
   .setName("joueur")
   .setDescription("Joueur du serveur à envoyer le message")
   .setRequired(true)
   )
.addStringOption(option => 
  option
  .setName("message")
  .setDescription("Le message à envoyer")
  .setRequired(true)
  )     

  var invnum = new SlashCommandBuilder()
  .setName("invnum")
  .setDescription("Le nombre d'invites sur le serveur")

  var say = new SlashCommandBuilder()
  .setName("say")
  .setDescription("Dire un message que le bot enverra")
  .addStringOption(option => option
    .setName("message")
    .setDescription("Message à envoyer")
    .setRequired(true)  
  )

  var giverole = new SlashCommandBuilder()
  .setName("giverole")
  .setDescription("Donnez un role à un membre")
  .addRoleOption(option => option
    .setName("role")
    .setDescription("Role a donnez à un membre")
    .setRequired(true)
    )
  .addUserOption((option) => option
    .setName("personne")
    .setDescription("Personne à donnez le role")  
    .setRequired(true)
  )

  var avatar = new SlashCommandBuilder()
  .setName("avatar")
  .setDescription("Demandez l'avatar  d'un utilisateur")
  .addUserOption(option => option
    .setName("gars")
    .setDescription("La personne dont tu veux l'avatar")
    .setRequired(true)
    )

  var join = new SlashCommandBuilder()
  .setName("join")
  .setDescription("Join un salon vocal pour jouer de la musique")
  .addChannelOption(option => option
    .setName("salon")
    .setDescription("Le salon qu'il faut rejoindre")
    .setRequired(true))
    
  var play = new SlashCommandBuilder()
  .setName("play")
  .setDescription("Jouer une musique")
  .addStringOption(option => option
    .setName("url")
    .setDescription("Mettre une url youtube")
    .setRequired(true))
  
  var pause = new SlashCommandBuilder()
  .setName("pause")
  .setDescription("Mettre une pause sur la vidéo youtube")

 var quit = new SlashCommandBuilder()
 .setName("quit")
 .setDescription("Quitter la vidéo youtube")

 var  removerole = new SlashCommandBuilder()
 .setName("removerole")
 .setDescription("Enlever un role de l'utilisateurs")
 .addRoleOption(option => option
   .setName("role")
   .setDescription("Enlever un role de l'utilisateur"))
 .addUserOption(option => option
  .setName("player")
  .setDescription("Enlever un role de l'utilisateur")) 

 var ticket = new SlashCommandBuilder()
 .setName("ticket")
 .setDescription("Créez un ticket")

 var cat = new SlashCommandBuilder()
 .setName("cat")
 .setDescription("Demandez un chat")

 var dog = new SlashCommandBuilder()
 .setName("dog")
 .setDescription("Demandez un chien")

 var blague = new SlashCommandBuilder()
 .setName("blague")
 .setDescription("Demandez une blague")

Client.on('ready', async () => {
  Client.application.commands.create(ping)
  Client.application.commands.create(clear)
  Client.application.commands.create(tcommand)
  Client.application.commands.create(help)
  Client.application.commands.create(ban)
  Client.application.commands.create(kick)
  Client.application.commands.create(saymp)
  Client.application.commands.create(invnum)
  Client.application.commands.create(say)
  Client.application.commands.create(giverole)
  Client.application.commands.create(avatar)
  Client.application.commands.create(join)
  Client.application.commands.create(play)
  Client.application.commands.create(pause)
  Client.application.commands.create(removerole)
  Client.application.commands.create(quit)
  Client.application.commands.create(ticket)
  Client.application.commands.create(cat)
  Client.application.commands.create(dog)
  Client.application.commands.create(blague)
  
  console.log("Je suis connecté !")
  Client.user.setPresence({
    activities: [{
      name: Client.guilds.cache.get("998972097374212116").memberCount + ' utilisateurs',
      type: 'WATCHING'
    }],
  })
})

Client.on("voiceStateUpdate", async (oldState, newState) =>{
  if(newState.channelId && newState.channel.type === 'GUILD_STAGE_VOICE' && newState.guild.me.voice.suppress){
    try{
      await newState.guild.me.voice.setSuppressed(false)
    }catch(e){}
  } 
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
    if(interaction.commandName === "clear"){
      var number = interaction.options.getInteger("number")
      console.log(number)
      if(number >= 1 && number <= 100){
        interaction.channel.bulkDelete(number)
        interaction.reply({content: "Tu as supprimer **" + number + "** messages", ephemeral: true})
      } else {
        interaction.reply({content: "Tu ne peux supprimer de message avec la valuer **" + number + "**, sa ne peux que etre entre 1 et 100", ephemeral: true})
      }
    }
  }
})

//joinedTimestamp

Client.on("guildMemberAdd", async member => {
       

  Canvas.registerFont('./my-project/Minecrafter.Reg.ttf', { family: 'minecrafter' })

  const canvas = Canvas.createCanvas(1920,1080)
  
  const ctx = canvas.getContext("2d")

  const bg = await Canvas.loadImage(background)
  ctx.drawImage(bg, -325, -200)

  ctx.font = "60px minecrafter"
  ctx.fillStyle = "#FFF"
  ctx.textAlign = "center"
  ctx.fillText(member.user.username.toUpperCase() + ` vient d'arrivee. On est maintenant ${member.guild.memberCount} `, 1010, 900)

  ctx.beginPath()
  ctx.arc(950, 400, 250, 0, Math.PI * 2)
  ctx.closePath()
  ctx.clip()

  var avatar = await Canvas.loadImage(member.user.displayAvatarURL({
    format: "png",
    size: 1024
  }))

  ctx.drawImage(avatar, 600, 100, 700, 700)

  const attachments = new Discord.MessageAttachment(canvas.toBuffer(), "welcome"+ Math.random() + ".png")

 

const msg = await Client.channels.cache.get("1020740158364078190").send({ files: [attachments] })
const url = msg.attachments.first()?.url ?? '';

const embeds = new Discord.MessageEmbed()
.setImage(url)
.setTitle("Dites bonjour à " + member.user.username)
.setDescription("Bienvienue <@" + member.user.id + ">")
.setColor("GOLD")
.setTimestamp(member.joinedTimestamp)

await Client.channels.cache.get("1020740158364078190").send("<@" + member.user.id + ">")

await Client.channels.cache.get("1020740158364078190").send({
  embeds: [embeds]
}) 


  await msg.delete()
})

Client.on("interactionCreate",  interaction => {
  if(interaction.isCommand()){
    if(interaction.commandName === "tcommand"){
        interaction.reply('EN dev')
    }
  }
})

Client.on("guildMemberRemove", async member => {    

  Canvas.registerFont('./my-project/Minecrafter.Reg.ttf', { family: 'minecrafter' })

  const canvas = Canvas.createCanvas(1920,1080)
  
  const ctx = canvas.getContext("2d")

  const bg = await Canvas.loadImage(background)
  ctx.drawImage(bg, -325, -200)

  ctx.font = "60px minecrafter"
  ctx.fillStyle = "#FFF"
  ctx.textAlign = "center"
  ctx.fillText(member.user.username.toUpperCase() + ` vient de partir. On est maintenant ${member.guild.memberCount} `, 1010, 900)

  ctx.beginPath()
  ctx.arc(950, 400, 250, 0, Math.PI * 2)
  ctx.closePath()
  ctx.clip()

  var avatar = await Canvas.loadImage(member.user.displayAvatarURL({
    format: "png",
    size: 1024
  }))

  ctx.drawImage(avatar, 600, 100, 700, 700)

  const attachments = new Discord.MessageAttachment(canvas.toBuffer(), "welcome"+ Math.random() + ".png")

 

const msg = await Client.channels.cache.get("1014519600320368681").send({ files: [attachments] })
const url = msg.attachments.first()?.url ?? '';

const embeds = new Discord.MessageEmbed()
.setImage(url)
.setTitle("Dites au revoir à " + member.user.username)
.setDescription("Au revoir <@" + member.user.id + ">")
.setColor("GOLD")
.setTimestamp(member.joinedTimestamp)

await Client.channels.cache.get("1014519600320368681").send("<@" + member.user.id + ">")

await Client.channels.cache.get("1014519600320368681").send({
  embeds: [embeds]
}) 


  await msg.delete()
})

Client.on("interactionCreate", interaction => {
  if(interaction.isCommand()){
    if(interaction.commandName === "help"){
      const embeds = new Discord.MessageEmbed()
      .setTitle("__Help__")
      .setColor("AQUA")
      .setDescription(`Voici les commandes ** ${interaction.user.username} **`, "👨🏾‍💻")
      .addField("/clear", "Clear un nombre de messages défini")
      .addField("/tcommand", "Que pour les admins - Testez certaines commandes")
      .addField("/help", "Avoir les commandes")
      .setAuthor(interaction.user.username, interaction.user.avatarURL())
      .setFooter(Client.guilds.cache.get("998972097374212116").name, Client.guilds.cache.get("998972097374212116").iconURL())

      interaction.reply({embeds: [embeds]})
    }
  }
})

Client.on("interactionCreate", async interaction => {
  if(interaction.isCommand()){
    if(interaction.commandName === "ban"){
      if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.reply({content: "Tu n'as pas les permissions requises pour effectuer cette commande", ephemeral: true});
         
      const user = interaction.options.getUser('joueur')
      const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})
     

      if(!member) return interaction.reply("😅 | Je ne peux avoir de details sur ce membres.");
      const reason = interaction.options.getString('raison')

      if(!member.bannable || member.user.id === Client.user.id) 
      return interaction.reply({content: "😅 | Je ne peux pas me ban moi-même ou ban quelqu'un de plus haut dans la hiérachie", ephemeral: true});
      
      if(interaction.member.roles.highest.position <= member.roles.highest.position) 
      return interaction.reply('Ce membre est trop haut hiérarchiquement.')
      
      const embed = new Discord.MessageEmbed()
      .setDescription(`**${member.user.tag}** a été ban du serveur par ${interaction.user.username} pour \`${reason}\``)
      .setColor("GREEN")
      .setFooter(`Bannisement par ${interaction.user.username}`, Client.user.displayAvatarURL())
      .setTimestamp()

      await member.user.send(`Vous avez été ban de **\`${interaction.guild.name}\`** pour \`${reason}\``).catch(err => {})
      member.ban({ reason })

      return interaction.reply({ embeds: [ embed ]})
    }
  }
})

Client.on("interactionCreate", async interaction => {
  if(interaction.isCommand()){
    if(interaction.commandName === "kick"){
      if(!interaction.member.permissions.has("KICK_MEMBERS")) return interaction.reply({ content: "You do not have enough permissions to use this command.", ephemeral: true })

        const user = interaction.options.getUser('membre')
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})

        if(!member) return interaction.reply("😅 | Je ne peux avoir de details sur ce membre.");
        const reason = interaction.options.getString('reason')

        if(!member.kickable || member.user.id === Client.user.id) 
        return interaction.reply("😅 | Je ne peux pas kick ce membre");
        
        if(interaction.member.roles.highest.position <= member.roles.highest.position) 
        return interaction.reply("Je ne peux pas me ban moi-même ou ban quelqu'un de plus haut dans la hiérachie.")
        
        const embed = new Discord.MessageEmbed()
        .setDescription(`**${member.user.tag}** a été kick par ${interaction.user.username} pour \`${reason}\``)
        .setColor("GREEN")
        .setFooter(`Kick par ${interaction.user.username}`, Client.user.displayAvatarURL())
        .setTimestamp()

        await member.user.send(`Tu as été bannie de **\`${interaction.guild.name}\`** par ${interaction.user.username} pour \`${reason}\``).catch(err => {})
        member.kick({ reason })

        return interaction.reply({ embeds: [ embed ]})
    }
  }
})

  Client.on("applicationCommandCreate", commande => {
    const embeds = new Discord.MessageEmbed()
    .setTitle(`Nouvelle commande **${commande.name}**`)
    .setDescription(`C'est une commande pour ${commande.description}`)
    .setFooter(`Créez le ${commande.createdAt.toLocaleString()} à ${commande.createdTimestamp.toLocaleString()}`)
    .setTimestamp(commande.createdTimestamp.toLocaleString())

    Client.channels.cache.get("1020725024790941696").send({embeds: [embeds]})
  })

  Client.on("applicationCommandUpdate", commande => {
    const embeds = new Discord.MessageEmbed()
    .setTitle(`Nouvelle commande **${commande.name}**`)
    .setDescription(`C'est une commande pour ${commande.description}`)
    .setFooter(`Créez le ${commande.createdAt.toLocaleString()} à ${commande.createdTimestamp.toLocaleString()}`)
    .setTimestamp(commande.createdTimestamp.toLocaleString())

    Client.channels.cache.get("1020725024790941696").send({embeds: [embeds]})
  })


  Client.on("interactionCreate", async interaction => {
    if(interaction.isCommand()){
      if(interaction.commandName === "saymp"){
        var user = interaction.options.getUser("joueur");
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})
        var msg = interaction.options.getString("message");

        await member.user.send(`**${interaction.user.username}** : ${msg}`)
        await interaction.reply({content: `Vous avez envoyé à **${member.user.username}** : ${msg}`, ephemeral: true});
      }
    }
  })

  Client.on("interactionCreate", interaction => {
    if(interaction.isCommand()){
      if(interaction.commandName === "invnum"){
        const invites = Client.guilds.cache.get('998972097374212116').invites.fetch().then(res => res)

        console.log(invites)
      }
    }
  })

  Client.on("interactionCreate", interaction => {
    if(interaction.isCommand()){
      if(interaction.commandName === "say"){
        if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({content: "Tu n'as pas les permissions de faire ceci.", ephemeral: true});
        const mess = interaction.options.getString("message")
        interaction.channel.send(mess)
      }
    }
  })

  Client.on("interactionCreate", async interaction => {
    if(interaction.isCommand()){
      if(interaction.commandName === "giverole"){
        if(!interaction.member.permissions.has("MANAGE_ROLES")) return interaction.reply({content: "Tu n'as pas les permissions de faire ceci.", ephemeral: true});
        var user = interaction.options.getUser("personne");
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})
        const role = interaction.options.getRole('role')
        
        member.roles.add(role)
        await interaction.reply(`Tu as rajouté le rôle ${role.name} à ${user.username}`)
        await member.user.send(`Le rôle ${role} a été ajouté sur ${interaction.guild.name}`)
      }
    }
  })

  Client.on('interactionCreate', async interaction => {
    if(interaction.isCommand()){
      if(interaction.commandName === 'avatar'){
        var user = interaction.options.getUser('gars')
        
        await interaction.reply(user.displayAvatarURL())
      }
    }
  })
  

Client.on("interactionCreate", async interaction => {
  if(interaction.isCommand()){
    if(interaction.commandName === "removerole"){
      if(!interaction.member.permissions.has("MANAGE_ROLES")) return interaction.reply({content: "Tu n'as pas les permissions de faire ceci.", ephemeral: true});
      var user = interaction.options.getUser("player");
      const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})
      const role = interaction.options.getRole('role')
       
      member.roles.remove(role)
      if(!member.roles.have(role)) return interaction.reply("Il n'a pas ce role")
      await interaction.reply(`Tu as enlever le rôle ${role.name} à ${user.username}`)
      await member.user.send(`Le rôle ${role} a été ajouté sur ${interaction.guild.name}`)
    }
  }
})

Client.on("interactionCreate", async interaction => {
  if(interaction.isCommand()){
  if(interaction.commandName === "ticket"){
    const embed = new Discord.MessageEmbed()
    .setTitle("Ticket")
    .setDescription("Ticket Hanadia Bot")
    .addFields(
      { name: 'Regular field title', value: 'Créez un ticket' },
      { name: '\u200B', value: '\u200B' },
      { name: 'Demandez une plainte', value: 'Role', inline: true },
      { name: 'Demandez un role', value: 'Plainte',  },
      { name: 'Demandez un remboursement', value: 'Demande de rank', inline: true },
      { name: 'Candidature', value: 'Candidatez', },
    )
    .setAuthor("Ticket Hanadia")

    const row = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageButton()
					.setCustomId('btn-ticket-1')
					.setLabel('Ticket')
					.setStyle("PRIMARY"),
			);

		await interaction.reply({ embeds: [embed] , components: [row], ephemeral: true });
  }
}
})


Client.on("interactionCreate", async interaction => {
  if(interaction.isButton()){
    if(interaction.customId === "btn-ticket-1"){
      const createChannel = interaction.guild.channels.create("ticket-" + interaction.user.username)

      const embed = new Discord.MessageEmbed()
      .setTitle("Voici votre Ticket")
      .setDescription("__"+ interaction.user.username + "__")
      .setFooter(interaction.guild.name)
      .setTimestamp(interaction.member.joinedTimestamp)

      await interaction.reply({content: `Voici votre #ticket-${interaction.user.username.toLowerCase()}`, ephemeral: true})

      await interaction.guild.channels.cache.get((await createChannel).id).send("<@" + interaction.user.id + ">")
      await interaction.guild.channels.cache.get((await createChannel).id).send({ embeds: [embed]})
      await (await createChannel).setParent("1020767784415805483")

      await (await createChannel).permissionOverwrites.create(interaction.user, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true,
        ATTACH_FILES: true,
        VIEW_CHANNEL: true,
        READ_MESSAGE_HISTORY: true
      })

      const arch = new Discord.MessageActionRow()
      .addComponents(
				new Discord.MessageButton()
					.setCustomId('btn-ticket-2')
					.setLabel('Archiver')
					.setStyle("DANGER"),
        new Discord.MessageButton()
					.setCustomId('btn-ticket-3')
					.setLabel("Supprimer")
					.setStyle("DANGER"),
			);
      
      
      await interaction.guild.channels.cache.get((await createChannel).id).send({components: [arch]})
    }
  }
})

Client.on("interactionCreate", async interaction => {
  if(interaction.isButton()){
    if(interaction.customId === "btn-ticket-2"){
      if(!interaction.member.permissions.has("MANAGE_CHANNEL")) return interaction.reply({ content: "Tu n'as pas les permissons de faire ceci", ephemeral: true });

      await interaction.channel.setParent("1021093928742699108")
      await interaction.channel.setName("/archive/ ticket-" + interaction.user.username)
      await interaction.reply({ content: `Ticket #${interaction.channel.name} **archivée** et est maintenant dans la catégorie ${interaction.channel.parent}!`, ephemeral: true });
    }
  }
})

Client.on("interactionCreate", async interaction => {
  if(interaction.isButton()){
    if(interaction.customId === "btn-ticket-3"){
      if(!interaction.member.permissions.has("MANAGE_CHANNEL")) return interaction.reply({ content: "Tu n'as pas les permissons de faire ceci", ephemeral: true });

        await interaction.channel.delete()
    }
  }
})

Client.on("interactionCreate", async interaction => {
  if(interaction.isCommand()){
    if(interaction.commandName === "cat"){

      axios.get("https://api.thecatapi.com/v1/images/search").then(function(res){
        const embeds = new Discord.MessageEmbed()
        .setTitle(interaction.user.username)
        .setColor("BLUE")
        .setDescription(res.data[0].id)
        .setImage(res.data[0].url)
        .setFooter(res.data[0].height + "x" + res.data[0].width)
        .setTimestamp(interaction.createdAt)

        interaction.reply({ embeds: [embeds] })
        interaction.reply("<@" + interaction.user.id + ">")
      })
    }
  }
})

Client.on("interactionCreate", async interaction => {
  if(interaction.isCommand()){
    if(interaction.commandName === "dog"){

      axios.get("https://dog.ceo/api/breeds/image/random").then(function(res){
       const embeds = new Discord.MessageEmbed()
        .setTitle(interaction.user.username)
        .setColor("BLUE")
        .setImage(res.data.message)
        .setTimestamp(interaction.createdAt)

        interaction.reply({content: "<@" + interaction.user.id + ">", embeds: [embeds] })
      })
    }
  }
})

Client.on("interactionCreate", async interaction => {
  if(interaction.isCommand()){
    if(interaction.commandName === "blague"){

      axios.get("https://blague.xyz/api/joke/random").then(function(res){
        const embeds = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle(`**${res.data.joke.question}**`)
        .setDescription(`||${res.data.joke.answer}||`)
        .setTimestamp(interaction.createdAt)
        
        interaction.reply({content: "<@" + interaction.user.id + ">",  embeds: [embeds]})
      })
    }
  }
})


Client.login(TOKEN + TOKEN1 + TOKEN2)
