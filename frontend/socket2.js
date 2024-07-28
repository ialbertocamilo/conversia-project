const io = require("socket.io-client")

const token =`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmExYTQ1NjUzNGUwZjY1ZTBjYjc3ODMiLCJ1c2VybmFtZSI6ImNhbWlsbzEiLCJpYXQiOjE3MjIxMjE1NzUsImV4cCI6MTcyMjEyNTE3NX0.nCPcVii4KNyWJR2YMR26Qw8u3BtqhkrstSMuYc3ZRRY`
const socket = io(`http://localhost:3000`, {extraHeaders: {authorization: `${token}`}});
socket.on('connect', () => {
    console.log('Connected to server');


    setTimeout(() => {


    }, 1000)
});

socket.on('message', (data) => {
    console.log('Received message:', data);
});
let readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.on('keypress', (data) => {
    console.log("Detecting key")
    console.log(data)
    if (data === 'd') {
        socket.emit('message')
    }
})
socket.on('status_message', (data) => {
    console.log(data)
})

socket.emit('message', {data: 'Hello from client'});