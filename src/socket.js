const { Server } = require('socket.io');
const config = require('./config/config');
const normalizerChat = require('./normalizer/chat');
const getApiDao = require('./persistence');

let db;
getApiDao(config.server.dbType).then((data) => {
  db = data.ChatsDaoContainer
})

const socket = (server) => {
    const io = new Server(server)
    io.on("connection",(socket)=>{
        console.log("nuevo socket o cliente conectado",socket.id);
        socket.on("clientMessage",async (data)=>{
            await db.saveMessage(data)
            const messageHistory = await db.getAll()
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
