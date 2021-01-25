module.exports = (client, triggerText, replyText) => {
    client.on('message', (message) => {
      if (
        message.channel.type === 'dm' &&
        message.content.toLowerCase() === triggerText.toLowerCase()
      ) {
        message.author.send(replyText)
        console.log(message.author.username + " said " + message.content)
      }
    })
  }