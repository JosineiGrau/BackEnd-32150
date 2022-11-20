import moment from "moment";
import { carts } from "../../../models/carts.js";
import { MongoStore } from "../../../store/mongoStore.js";
import error from "../../../utils/setError.js";
import { ProductsMongo } from "../productos/productsMongo.class.js";
const products = new ProductsMongo()
const carritos = new MongoStore(carts)

export class CartsMongo {

    async save() {
        try {
            const newCart = {
                time_stamp: moment().format('DD/MM/YYYY HH:mm:ss A'),
                products: [],
            };
           const result = await carritos.save(newCart)
           return result
        } catch (err) {
            throw error ('Internal Server Error', 500) 
        }
    }

    async addProduct(id, body) {

        const productExist = await products.getById(body.id)
        if(productExist) {
            if(productExist[0].stock > 0) {
                const addProduct = await carritos.addProduct(id, productExist[0])
                return addProduct
            } else {
                throw error('Producto sin stock', 400)
            }
        } else {
            throw error('product not found', 404)
        }
       
    }
    
    async getAll() {
        const result = await carritos.getAll()
        return result
       
    }
    
    async getById(id) {
        const result = await carritos.getById(id)
        if(result.length === 0) throw error('cart not found', 404)
        return result
    }

    async deleteProduct(id,productId) {
        const cart = await this.getById(id)
        const productInCart = cart[0].products.find(item => item.id === productId)
        if(productInCart) {
            const result = await carritos.deleteProduct(id, productId)
            return result
        } else {
            throw error('product not found', 404)
        }
    }
    
    async deleteById(id) {
        await this.getById(id)
        const result = await carritos.deleteById(id)
        return result
        
    }
    
}
