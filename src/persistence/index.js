import { MongoClient } from "../clients/dbMongo.client.js";
import { UserModel } from "./models/users.js";

export const getApiDao = async (dbType) => {
    let UserDaoContainer;
    let ProductsDaoContainer;
    let ChatsDaoContainer;

    if (dbType === 'MONGO') {
        const client = new MongoClient()
        await client.connect()
        const { ProductsFsDao } = await import("./daos/products/productsDao.js")
        const { ChatsFsDao } = await import("./daos/chats/chatsFsDao.js")
        const { UserMongoDao } = await import("./daos/users/userMongoDao.js")
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
