const io = require("socket.io-client")

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmExYTRhOTUzNGUwZjY1ZTBjYjc3ODUiLCJ1c2VybmFtZSI6ImNhbWlsbzIiLCJpYXQiOjE3MjIxMjAyMTIsImV4cCI6MTcyMjEyMzgxMn0.UamYZnf-Dq8oRy9S3vFg7ejuydnDOTtfL724nLRRkis`
const socket = io(`http://localhost:3000`, {extraHeaders: {authorization: `${token}`}}); // Replace with your server's address

socket.on('connect', () => {
    console.log('Connected to server');


    setTimeout(() => {

        console.log("Joining room")
        socket.emit('join_room', {
            name: 'camilo2',
            username: 'camilo2',
            _id: '66a1a4a9534e0f65e0cb7785',
            roomId: 'principal'
        })
        // socket.to('principal').emit('room_message', 'Mensaje desded socket.js')

    }, 1000)
});

socket.on('message', (data) => {
    console.log('Received message:', data);
});
socket.on('status_message', (data) => {
    console.log(data)
})
