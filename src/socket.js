const { Server } = require('socket.io');
const normalizerChat = require('./normalizer/chat');
const ChatFS = require('./services/daos/ChatFS.daos');

const chat = new ChatFS()

const socket = (server) => {
    const io = new Server(server)
    io.on("connection",(socket)=>{
        console.log("nuevo socket o cliente conectado",socket.id);
        socket.on("clientMessage",async (data)=>{
            await chat.saveMessage(data)
            const messageHistory = await chat.getAll()
            const res = normalizerChat(messageHistory)
            io.sockets.emit("messageHistory",res)
        })
        socket.on("userEscribiendo",(data)=>{
            console.log(data)
            socket.broadcast.emit("usuarioRecibido",data)
        })
    })
}

module.exports = socket
