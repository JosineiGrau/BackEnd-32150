import { getApiDao } from '../persistence/index.js';
import config from '../config/config.js';


const { ChatsDaoContainer } = await getApiDao(config.server.dbType)


export const saveMessage = async (data) => {
    const newMessage = await ChatsDaoContainer.saveMessage(data)
    return newMessage
}
export const getChats = async () => {
    const allMessages = await ChatsDaoContainer.getAll()
    return allMessages
}