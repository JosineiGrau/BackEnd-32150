import { Router } from 'express'
import validateData from '../../utils/chatValidate.js'
import { checkSession } from '../../middleware/auth.js'
import { getChatsController, getViewChatsController, postChatController } from '../../controllers/chats.controller.js'


const chatsRoute = Router(); 

// GET
chatsRoute.get('/', checkSession, getChatsController);

chatsRoute.get('/view', checkSession, getViewChatsController);

chatsRoute.post('/', validateData, checkSession, postChatController); 

export {chatsRoute}
