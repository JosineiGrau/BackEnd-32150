const mongoose = require('mongoose');
const error = require('../utils/setError');
const config = require('../config/config');

class MongoClient {
    constructor() {
        this.client = mongoose
    }

    async connect() {
        try {
            this.client.set('strictQuery', false)
            await this.client.connect(config.mongoDB.mongoUrl)
            console.log('Conexión a la base de datos de manera exitosa')
        } catch (err) {
            throw error('Internal Server Error', 500) 
        }
    }

    async disconnect() {
        try {
            await this.client.connection.close()
            console.log('Base de datos desconectada')
        } catch (err) {
            throw error('Internal Server Error', 500) 
        }
    }
}
module.exports = MongoClient