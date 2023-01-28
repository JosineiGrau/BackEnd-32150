const dataAdapterMongo = require('../../utils/dataAdapter');
const error = require('../../utils/setError');

class MongoStore {
    constructor(collectionModel) {
        this.collectionModel = collectionModel
    }

    async save(item) {
        try {
            const result = await this.collectionModel.create(item)
            const dataAdapter = dataAdapterMongo(result)
            return dataAdapter
        } catch (err) {
            throw error ('Internal Server Error', 500) 
        }
    }

    async getAll() {
        try {
            const result = await this.collectionModel.find({})
            return result
        } catch (err) {
            throw error ('Internal Server Error', 500) 
        }
    }

    async getById(id, type) {
        try {
            const result = await this.collectionModel.find({_id: id})
            return result
        } catch (err) {
            throw error(`${type} not found`, 404)
        }
    }

    async deleteById(id, type) {
        try {
            const result = await this.collectionModel.deleteOne({_id: id})
            return result
        } catch (err) {
            throw error(`${type} not found`, 404)
        }
    }

    async update(id, body) {
        try {
            await this.collectionModel.updateOne({_id: id},{$set: {...body}})
            const docById = await this.getById(id)
            return docById
        } catch (err) {
            throw error ('Internal Server Error', 500)  
        }
    }

    async addProduct (id, body) {
        try {
            const cart = await this.getById(id)
            cart[0].products.push(body)
            cart[0].save()
            return cart[0]
		} catch (err) {
			throw error ('Internal Server Error', 500)  
		}
    }

    async deleteProduct (cartId, productId) {
        try {
            const cart = await this.collectionModel.updateOne({ _id: cartId }, { $pull: { products: {_id: {$eq: productId}} } }, { multi: false, new: true })
            return cart
		} catch (err) {
			throw error ('Internal Server Error', 500)  
		}
    }


}

module.exports = MongoStore