import { getApiDao } from '../persistence/index.js';
import config from '../config/config.js';

const { ChatsDaoContainer } = await getApiDao(config.server.dbType)

export const chatsRoot = {
    getMessages: async () => {
        const allMessages = await ChatsDaoContainer.getAll()
        return allMessages

    },
    saveMessage: async ({ data }) => {
        const newMessage = await ChatsDaoContainer.saveMessage(data)
        return newMessage
    }
}
