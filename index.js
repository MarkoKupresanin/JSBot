const NODETOKEN = process.env['NODETOKEN'];


const Discord = require('discord.js')
const client = new Discord.Client()


const config = require('./config.json')
const command = require('./command')
const firstMessage = require('./first-message')
const privateMessage = require('./private-message')


client.on('ready', () => {

      
      console.log("Starting...");
      console.log("The client is ready!");



  firstMessage(client, '803118508120080434', "Idk", ['🍉', '😐', '🔥'])

  command(client, ['ping', 'test'], (message) => {
      message.channel.send("Pong")
  })

  command(client, 'servers', (message) => {
      client.guilds.cache.forEach((guild) => {
          message.channel.send(`The shitty server ${guild.name} has a total of ${guild.memberCount} members`)

    })
  })
  command(client, ["cc", "clearchannel"], message => {
      if (message.member.hasPermission('ADMINISTRATOR')) {
          message.channel.messages.fetch().then((results) => {
              message.channel.bulkDelete(results)
          })
      }
  })

  command(client, "status", message => {
      const content = message.content.replace('%status ', '')

      client.user.setPresence({
          activity: {
              name: content, 
              type: 0,
          },
      })
  })
  privateMessage(client, 'pm', 'Sure')
  command(client, "send", message => {
      const sendingto = message.content.replace('%send ', '')

      
  client.users.fetch(String(sendingto)).then(user => {
    user.send("Yo did this work?")
  })
  })

  command(client, 'embeder', (message) => {
      const logo = "https://i.imgur.com/5nOWbAI.jpg"
      console.log(message.author)
      const embed = new Discord.MessageEmbed()
      .setTitle("Lol")
      .setAuthor(message.author.username)
      .setImage(logo)
      .setThumbnail(logo)
      .setFooter("Lmao", message.author.avatarURL())
      .setColor("#00AAFF")
      .addFields({
          name: "Field 1",
          value: "Yo",
          inline: true,
          name: "Field 2",
          value: "Yo",
          inline: true,
          name: "Field 3",
          value: "Yo",
          inline: true,
      })
      .setURL("https://sustainability.google/commitments/?utm_source=googlehpfooter&utm_medium=housepromos&utm_campaign=bottom-footer&utm_content=")
      message.channel.send(embed)

  })

command(client, 'server', message => {
    const { guild } = message
    // console.log(guild)

    const { name, region, memberCount, owner, afkTimeout, createdAt } = guild
    const icon = guild.iconURL()
    const embeduno = new Discord.MessageEmbed()
    .setTitle(`Server info for **${name}**`)
    .setThumbnail(icon)
    .setColor("#EBCB3D")
    .setFooter("Requested by: " + message.author.username, message.author.avatarURL())
    .addFields({
        name: 'Region:',
        value: region,
    }, {
        name: 'Owner:',
        value: owner.user.tag,
    }, {
        name: 'Total Members:',
        value: memberCount
    }, {
        name: 'AFK Timeout:',
        value: afkTimeout/60 +" Minutes",
    }, {
        name: 'Creation Date:',
        value: createdAt,
    }

    )

    message.channel.send(embeduno)

    //message.channel.send("Check the console")


})


})

client.login(NODETOKEN)