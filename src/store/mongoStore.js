import error from "../utils/setError.js"
import { conecctionMongo } from "../config/mongo.js";
import { dataAdapterMongo } from "../utils/dataAdapter.js";
conecctionMongo()

export class MongoStore {
    constructor(collectionModel) {
        this.collectionModel = collectionModel
    }

    async save(item) {
        try {
            const result = await this.collectionModel.create(item)
            const dataApapter = dataAdapterMongo(result)
            return dataApapter
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
    
    async getById(id) {
        try {
            const result = await this.collectionModel.find({_id: id})
            return result
        } catch (err) {
            throw error ('Internal Server Error', 500) 
        }
    }
    
    async deleteById(id) {
        try {
            const result = await this.collectionModel.deleteOne({_id: id})
            return result
        } catch (err) {
            throw error ('Internal Server Error', 500) 
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
			console.log(error);
		}
    }

    async deleteProduct (cartId, productId) {
        try {
            const cart = await this.collectionModel.updateOne({ _id: cartId }, { $pull: { products: {_id: {$eq: productId}} } }, { multi: false, new: true })
            return cart
		} catch (err) {
			console.log(error);
		}
    }


}