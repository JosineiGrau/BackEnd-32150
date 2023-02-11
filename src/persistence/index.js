// const config = require("../config/config")
const MongoClient = require("../clients/dbMongo.client");
const UserModel = require("./models/users")


const getApiDao = async (dbType) => {
    let UserDaoContainer;
    let ProductsDaoContainer;
    let ChatsDaoContainer;

    if (dbType === 'MONGO') {
        const client = new MongoClient()
        await client.connect()
        const ProductsFsDao = await require("./daos/products/productsDao")
        const ChatsFsDao = await require("./daos/chats/chatsFsDao")
        const UserMongoDao = await require("./daos/users/userMongoDao")
        UserDaoContainer = new UserMongoDao(UserModel)
        ProductsDaoContainer = new ProductsFsDao('products.json')
        ChatsDaoContainer = new ChatsFsDao('chats.json')
    } else {
        console.log('BASE DE DATOS NO DISPONIBLE')
    }
    return {
        UserDaoContainer,
        ProductsDaoContainer,
        ChatsDaoContainer
    }
}

module.exports = getApiDao