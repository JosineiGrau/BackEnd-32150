import { db } from "../config/firebase.js"
import { dataAdaptedFromFirestore } from '../utils/dataAdapter.js';
import error from "../utils/setError.js"

export class FirebaseStore {
    constructor(collectionName) {
        this.collection = db.collection(collectionName)
        this.batch = db.batch()
    }

    async save(item) {
        try {
            const dataCreated = await this.collection.doc().create(item)
            return dataCreated
        } catch (err) {
            throw error ('Internal Server Error', 500) 
        }
    }
    
    async getAll() {
        try {
            const response = await this.collection.get()
            const data = response.docs.map((doc) => {
                return dataAdaptedFromFirestore(doc)
            })
            return data
        } catch (err) {
            throw error ('Internal Server Error', 500) 
        }
    }
    
    async getById(id) {
        try {
            const doc = this.collection.doc(id)
            const item = await doc.get()
            const response = item.data()
            return response
        } catch (err) {
            throw error ('Internal Server Error', 500) 
        }
    }
    
    async deleteById(id) {
        try {
            const doc = this.collection.doc(id)
            const item = await doc.delete()
            return item
        } catch (err) {
            throw error ('Internal Server Error', 500) 
        }
    }

    async update(id, body) {
        try {
            const doc = this.collection.doc(id)
            await doc.update({...body})
            const docById = await this.getById(id)
            return docById
        } catch (err) {
            throw error ('Internal Server Error',500)  
        }
    }

}