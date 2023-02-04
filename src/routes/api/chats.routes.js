const { Router } = require('express')
const validateData = require('../../utils/chatValidate')
const { checkSession } = require('../../middleware/auth')
const { getChatsController, getViewChatsController, postChatController } = require('../../controllers/chats.controller')

const chatsRoute = Router(); 

// GET
chatsRoute.get('/', checkSession, getChatsController);

chatsRoute.get('/view', checkSession, getViewChatsController);

chatsRoute.post('/', validateData, checkSession, postChatController); 

module.exports = chatsRoute
