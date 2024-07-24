const io = require("socket.io-client")
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmEwOGRiYTk5NjA5NWNjZmUwNDIwZjIiLCJ1c2VybmFtZSI6ImNhbWlsbyIsImlhdCI6MTcyMTgwMjA5MCwiZXhwIjoxNzIxODAyMTUwfQ.0cEA6zwtcbLwgjk2j0wypJUaghMyKPA8dHMPtYKFZUw'

const socket = io('http://localhost:3000', { extraHeaders: {authorization: `bearer ${token}`}}); // Replace with your server's address

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('message', (data) => {
    console.log('Received message:', data);
});

socket.emit('my-event', {data: 'Hello from client'});