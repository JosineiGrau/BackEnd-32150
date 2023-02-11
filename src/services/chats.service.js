const getApiDao = require('../persistence/index');
const config = require('../config/config');

let db;

getApiDao(config.server.dbType).then((data) => {
  db = data.ChatsDaoContainer
})

const saveMessage = async (data) => {
    const newMessage = await db.saveMessage(data)
    return newMessage
}
const getChats = async () => {
    const allMessages = await db.getAll()
    return allMessages
}


module.exports = {
  saveMessage,
  getChats
}