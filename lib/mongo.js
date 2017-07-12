const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/coin")

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('connection success!')
})


module.exports = mongoose