import {Server} from 'socket.io'
import { Chat } from './services/messages.class.js'

const chats = new Chat('chat')
export const socket = (server) => {
    const io = new Server(server)

    io.on("connection",(socket)=>{
        console.log("nuevo socket o cliente conectado",socket.id);
        socket.on("clientMessage",async (data)=>{
            await chats.saveMessage(data)
            const messageHistory = await chats.getAll()
            io.sockets.emit("messageHistory",messageHistory)
        })
        socket.on("userEscribiendo",(data)=>{
            socket.broadcast.emit("usuarioRecibido",data)
        })
    })
}