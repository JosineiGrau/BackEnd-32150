import { Server } from 'socket.io';
import config from './config/config.js';
import { normalizerChat } from './normalizer/chat.js';
import { getApiDao } from './persistence/index.js';

const { ChatsDaoContainer } = await getApiDao(config.server.dbType)

const socket = (server) => {
    const io = new Server(server)
    io.on("connection",(socket)=>{
        console.log("nuevo socket o cliente conectado",socket.id);
        socket.on("clientMessage",async (data)=>{
            await ChatsDaoContainer.saveMessage(data)
            const messageHistory = await ChatsDaoContainer.getAll()
            const res = normalizerChat(messageHistory)
            io.sockets.emit("messageHistory",res)
        })
        socket.on("userEscribiendo",(data)=>{
            console.log(data)
            socket.broadcast.emit("usuarioRecibido",data)
        })
    })
}

export default socket
