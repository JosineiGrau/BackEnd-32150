const moment = require('moment');
const productsModel = require('../../../models/products');
const MongoStore = require('../../../store/mongoStore');

const productos = new MongoStore(productsModel)

class ProductsMongo {
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
        const result = await productos.getById(id, 'product')
        return result
    }

    async deleteById(id) {
        await this.getById(id)
        const productDelete = await productos.deleteById(id, 'product')
        return productDelete

    }

    async update(id, body) {
        await this.getById(id)
        const productUpdated = await productos.update(id,body)
        return productUpdated
    }

}

module.exports = ProductsMongo