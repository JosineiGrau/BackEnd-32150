const success = require('../networks/responses');
const { saveMessage, getChats } = require('../services/chats.service');

const getChatsController = async (req, res, next) => {
    try {
		const allMessages = await getChats();
		success(res,200,'Estos son todos los mensajes', allMessages)
	} catch (err) {
		next(err)
	}
}

const getViewChatsController = async (req, res, next) => {
    try {
		const allMessages = await getChats()
		res.render('chat',{
			allMessages
		})
	} catch (err) {
		next(err)
	}
}

const postChatController = async (req, res, next) => {
    try {
		const newMessage = req.body;
		const getMessages = await saveMessage(newMessage);
		success(res,201,'Mensaje Agregado',getMessages)
	} catch (err) {
		next(err)
	}
}

module.exports = {
    getChatsController,
    getViewChatsController,
    postChatController
}