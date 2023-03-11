import { UsersMongoDao } from "./daos/users.dao.ts"; 
import { MongoClient, Collection, Document } from "../mods.ts";
import { serverConfig } from "../config/server.config.ts";


const client = new MongoClient()

const connectMongo = async (client: MongoClient) => {
    let db;
    let userModel: Collection<Document>;
    try {
        await client.connect(serverConfig.dataBaseUrl)
        console.log('Conexión exitosa a la base de datos')
        db = client.database("authDB")
        userModel = db.collection('users')
    // deno-lint-ignore no-unused-vars
    } catch (error) {
        console.log('Hubo un error al conectar a la base de datos')
    }

    return {model: userModel!}
}
const { model } = await connectMongo(client)

export const UserDaoContainer = new UsersMongoDao(model)
