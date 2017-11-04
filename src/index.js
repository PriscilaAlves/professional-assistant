// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080')

// Connection opened
socket.addEventListener('open', function (event) {
    console.log('Websocket opened')
});

// Listen for messages
socket.addEventListener('message', function (event) {
    message = JSON.parse(event.data)
    switch (message.cmd) {
      case 'ipAddress':
        document.getElementById('ipAddress').innerHTML = message.value
        break
      default:
        document.getElementById('message').innerHTML = message.cmd

    }
    console.log('Message from server ', event.data)
});
