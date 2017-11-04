const express = require('express')
const bodyParser = require('body-parser')
const ip = require("ip")
const http = require('http');
const url = require('url');
const WebSocket = require('ws');


const app = express()
app.use(bodyParser.json())

const port = process.env.PORT || 3000

// Define endpoints
app.put('/bequiet', function (req, res) {
  console.log('received bequiet')
  websocketHandler.send(JSON.stringify({'cmd': 'bequiet'}))
  res.sendStatus(200)
})

app.put('/goodmorning', function (req, res) {
  console.log('received goodmorning')
  websocketHandler.send(JSON.stringify({'cmd': 'goodmorning'}))
  res.sendStatus(200)
})

app.put('/sad', function (req, res) {
  console.log('received sad')
  websocketHandler.send(JSON.stringify({'cmd': 'sad'}))
  res.sendStatus(200)
})

app.put('/poop', function (req, res) {
  console.log('received poop')
  websocketHandler.send(JSON.stringify({'cmd': 'poop'}))
  res.sendStatus(200)
})

app.put('/lunch', function (req, res) {
  console.log('received lunch')
  websocketHandler.sendJSON.stringify(({'cmd': 'lunch'}))
  res.sendStatus(200)
})

app.put('/cake', function (req, res) {
  console.log('received cake')
  websocketHandler.send(JSON.stringify({'cmd': 'cake'}))
  res.sendStatus(200)
})

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let websocketHandler

wss.on('connection', function connection(ws, req) {
  websocketHandler = ws
  ws.send(JSON.stringify({'cmd': 'ipAddress', 'value':  ip.address()}))
})

server.listen(8080, function listening() {
  console.log('Listening on %d', server.address().port)
})

// Start app
app.listen(port)
console.log('RESTful API server started on: ' + port)
console.log('Your IP Address is:', ip.address())
