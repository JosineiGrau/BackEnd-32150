const FsChatStore = require('../../store/fsStoreChats');
const chats = new FsChatStore('chat.json')

class ChatFS {
    async saveMessage(data){
      const newMessage = chats.saveMessage(data)
      return newMessage
    }

    async getAll() {
        const allMessages = chats.getAll()
        return allMessages
	}
}

module.exports = ChatFS