const express = require('express')
const bodyParser = require('body-parser')
const ip = require("ip")
const http = require('http')
const WebSocket = require('ws')
const open = require('open')


const app = express()
app.use(bodyParser.json())

const port = process.env.PORT || 3000

app.put('/:emoji', function ({params: {emoji}, body}, res) {
  if (websocketHandler) {
    let response = {'cmd': emoji, value: ''}
    if (body && body.message) {
      response.value = body.message
    }
    websocketHandler.send(JSON.stringify(response))
  }
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
open(__dirname+'/src/index.html', 'chromium-browser')
console.log('RESTful API server started on: ' + port)
console.log('Your IP Address is:', ip.address())
