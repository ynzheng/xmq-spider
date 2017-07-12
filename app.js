const express = require('express')
const Message = require('./models/message')
const app = express()
const {
  getMessage
} = require('./controller/message')


app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
})

app.get('/', (req, res) => {
  res.send('index')
})

app.get('/messages', function (req, res) {
  Message.find({}).sort({
    'date': -1
  }).limit(30).exec((err, doc) => {
    let resp = {
      code: 200,
      succeeded: true,
      data: doc
    }
    res.json(resp)
  })
})

app.get('/hi', (req, res) => {
  res.send('hi')
})

app.get('/group/:id', function (req, res) {
  console.log(req.params.id)
  Message.find({
    gid: req.params.id
  }).sort({
    '_id': -1
  }).limit(20).exec((err, doc) => {
    let resp = {
      code: 200,
      succeeded: true,
      data: doc
    }
    res.json(resp)
  })
})




var server = app.listen(5000, function () {
  console.log('App listening on port 5000!');
});