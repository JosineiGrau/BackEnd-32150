import moment from "moment";
import { products } from "../../../models/productos.js";
import { MongoStore } from "../../../store/mongoStore.js";
import error from "../../../utils/setError.js";

const productos = new MongoStore(products)

export class ProductsMongo {
    async save(item) {
        const newProduct = {
            time_stamp: moment().format('DD/MM/YYYY HH:mm:ss A'),
            ...item
        }
        const result = await productos.save(newProduct)
        return result
    }
    
    async getAll() {
        const result = await productos.getAll()
        return result
    }
    
    async getById(id) {
        const result = await productos.getById(id)
        if(result.length === 0) throw error('product not found', 404)
        return result
    }
    
    async deleteById(id) {
        await this.getById(id)
        const productDelete = await productos.deleteById(id)
        return productDelete
     
    }

    async update(id, body) {
        await this.getById(id)
        const productUpdated = await productos.update(id,body)
        return productUpdated
    }

}