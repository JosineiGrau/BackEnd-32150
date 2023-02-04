const FsChatsStore = require('./managers/fsChats.manager');
const FsProductsStore = require('./managers/fsProduct.manager');


const chats = new FsChatsStore('chat.json')
const products = new FsProductsStore('db.json')

module.exports = {
    chats,
    products
}