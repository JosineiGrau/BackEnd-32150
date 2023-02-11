const dataAdapterMongo = require('../../utils/dataAdapter.utility');
const error = require('../../utils/setError');

class MongoStore {
    constructor(collectionModel) {
        this.collectionModel = collectionModel
    }

    async save(item) {
        try {
            const result = await this.collectionModel.create(item)
            console.log(result)
            return result
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
}

module.exports = MongoStore