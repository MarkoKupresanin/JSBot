const NODETOKEN = process.env['NODETOKEN'];


const Discord = require('discord.js')
const client = new Discord.Client()


const config = require('./config.json')
const command = require('./command')
const firstMessage = require('./first-message')
const privateMessage = require('./private-message')


client.on('ready', () => {
  console.log('The client is ready!')

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
})

client.login(NODETOKEN)