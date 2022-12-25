const { Router } = require('express')
const success = require('../networks/responses')
const validateData = require('../utils/chatValidate')
const ChatFS = require('../services/mensajes/ChatFS.class')
const { checkSession } = require('../middleware/auth')
const chat = new ChatFS()

const chatsRoute = Router(); 

// GET
chatsRoute.get('/', checkSession, async(req, res,next) => {
	try {
		const allMessages = await chat.getAll();
		success(res,200,'Estos son todos los mensajes', allMessages)
	} catch (err) {
		next(err)
	}
});

chatsRoute.get('/coder/chats', checkSession, async(req, res, next) => {
    try {
		const allMessages = await chat.getAll()
		res.render('chat',{
			allMessages
		})
	} catch (err) {
		next(err)
	}
});

chatsRoute.post('/', validateData, checkSession,async (req, res, next) => {
	try {
		const newMessage = req.body;
		const getMessages = await chat.saveMessage(newMessage);
		success(res,201,'Mensaje Agregado',getMessages)
	} catch (err) {
		next(err)
	}
}); 

module.exports = chatsRoute
