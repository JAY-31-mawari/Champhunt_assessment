const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors=require('cors')

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  });

app.use(cors())
app.get("/",(req,res)=>{
    res.send("<h1>Hello World</h1>")
})

let score=0

io.on('connection',(socket)=>{
    console.log("A new client has been connected",socket.id)

    socket.on('send_message',(data)=>{
        score += 10
        io.emit('score',{message:score})
    })
})

server.listen(4000,()=>{
    console.log("Server is listening on port 4000")
})