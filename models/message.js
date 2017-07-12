const mongoose = require('mongoose')
const Schema = mongoose.Schema
const db = require("../lib/mongo")

const MessageSchema = new Schema({
  id: String,
  gid: String,
  type: String,
  uid: String,
  date: String,
  data: Object
})

let Message = db.model("message", MessageSchema)

module.exports = Message