const Message = require('../models/message')

module.exports = {
  pushMessage: item => {
    Message.find({id: item.id}, (err, messages) => {
      if (err) {
        console.log('error: ', err)
      } else if (messages.length > 0) {
        console.log('The data is existed!')
      } else {
        let message = new Message(item)
        message.save((err, item) => {
          if (err) {
            console.log('error: ', err)
          }else {
            console.log('push data success!')
          }
        })
      }
    })
  },
  getMessage: () => {
    Message.find((err, messages) => {
        console.log(messages)
        return messages
    }).limit(3)
  }
}