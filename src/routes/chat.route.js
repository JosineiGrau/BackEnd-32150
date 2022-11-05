import { Router } from 'express'
import { Chat } from '../services/messages.class.js'

import { validateData } from '../utils/chat.validate.js'
import { success } from '../networks/responses.js'
const chatsRoute = Router(); 

const chats = new Chat('chat')

chatsRoute.get('/message',async(req, res) => {
	try {
		const allMessages = await chats.getAll()
		res.render('messages',{
			allMessages
		})
	} catch (error) {
		console.log(error);
	}
});

chatsRoute.get('/',async(req, res, next) => {
	try {
		const allMessages = await chats.getAll();
		success(res,200,'Estos son todos los mensajes', allMessages)
	} catch (err) {
		next(err)
	}
});

chatsRoute.post('/', validateData, async (req, res, next) => {
	try {
		const newMessage = req.body;
		const getMessages = await chats.saveMessage(newMessage);
		console.log(getMessages);
		success(res,201,'Mensaje Agregado',getMessages)
	} catch (err) {
		next(err)
	}
}); 

export { chatsRoute }