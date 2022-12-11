import { Router } from 'express'
import { success } from '../networks/responses.js'
import { validateData } from '../utils/chatValidate.js';
import { ChatFS } from '../services/mensajes/ChatFS.class.js';
import { checkSession } from '../middleware/auth.js';
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

export {chatsRoute}