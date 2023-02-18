import mongoose from 'mongoose'
import error from '../utils/setError.js'
import config from '../config/config.js'

export class MongoClient {
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