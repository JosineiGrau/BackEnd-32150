const moment = require('moment');
const cartsModel = require('../../../models/carts');
const MongoStore = require('../../../store/mongoStore')
const error = require('../../../utils/setError');
const ProductsMongo = require('../products/productsMongo.daos');
const products = new ProductsMongo()
const carritos = new MongoStore(cartsModel)

class CartsMongo {

    async save() {
        const newCart = {
            time_stamp: moment().format('DD/MM/YYYY HH:mm:ss A'),
            products: [],
        };
         const result = await carritos.save(newCart)
        return result

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
        const result = await carritos.getById(id, 'cart')
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
        const result = await carritos.deleteById(id, 'cart')
        return result

    }

}


module.exports = CartsMongo