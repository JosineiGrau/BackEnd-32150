import { FsChatStore } from "../../store/fsStoreChats.js";
const chats = new FsChatStore('chat.json')

export class ChatFS {
    async saveMessage(data){
      const newMessage = chats.saveMessage(data)
      return newMessage
    }

    async getAll() {
        const allMessages = chats.getAll()
        return allMessages
	}
}