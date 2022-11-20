import { config } from "../config/config.js";
import { CartsFS } from "../services/daos/carritos/cartsFS.class.js";
import { CartsMongo } from "../services/daos/carritos/cartsMongo.class.js";

let db;

if (config.database === 'Mongo'){
    db =  new CartsMongo()
} else if (config.database === 'FS'){
    db =  new CartsFS()
}


export default db