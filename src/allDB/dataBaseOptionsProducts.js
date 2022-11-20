import { config } from "../config/config.js";
import { ProductsFirebase } from "../services/daos/productos/productFirebase.class.js";
import { ProductsFS } from "../services/daos/productos/productFS.class.js";
import { ProductsMongo } from "../services/daos/productos/productsMongo.class.js";

let db;

if(config.database === 'Firebase'){
    db =  new ProductsFirebase()
} else if (config.database === 'Mongo'){
    db =  new ProductsMongo()
} else if (config.database === 'FS'){
    db =  new ProductsFS()
}


export default db