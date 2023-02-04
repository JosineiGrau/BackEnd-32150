const success = require('../networks/responses');
const ChatFS = require('../services/daos/ChatFS.daos');

const chat = new ChatFS()


const getChatsController = async (req, res, next) => {
    try {
		const allMessages = await chat.getAll();
		success(res,200,'Estos son todos los mensajes', allMessages)
	} catch (err) {
		next(err)
	}
}

const getViewChatsController = async (req, res, next) => {
    try {
		const allMessages = await chat.getAll()
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
		const getMessages = await chat.saveMessage(newMessage);
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