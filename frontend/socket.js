const io = require("socket.io-client")

const token = ``
const socket = io(`http://localhost:3000`, {extraHeaders: {authorization: `Bearer ${token}`}}); // Replace with your server's address

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('message', (data) => {
    console.log('Received message:', data);
});

socket.emit('message', {data: 'Hello from client'});