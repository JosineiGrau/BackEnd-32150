// deno-lint-ignore-file no-unused-vars
import { Collection, Document, ObjectId } from "../../mods.ts"
import { error } from "../../utils/setError.utility.ts"
import { UserSchema } from "../models/users.model.ts";

export class MongoStore{
    private collection: Collection<Document>;

    constructor(collection: Collection<Document>) {
        this.collection = collection
    }
    
    async save(body: Partial<UserSchema>) {
        try {
            console.log(body)
            const result = await this.collection.insertOne(body)
            return result
        } catch (err) {
            console.log(err)
            throw error ('Internal Server Error', 500) 
        }
    }

    async getAll() {
        try {
            const result = await this.collection.find().toArray()
            return result
        } catch (err) {
            throw error('Internal Server Error', 500) 
        }
    }

    async getById(id: string, type: string) {
        try {
            const result = await this.collection.findOne({_id: new ObjectId(id)})
            return result
        } catch (err) {
            throw error(`${type} not found`, 404)
        }
    }

    async deleteById(id: string, type: string) {
        try {
            const result = await this.collection.deleteOne({_id: new ObjectId(id)})
            return result
        } catch (err) {
            throw error(`${type} not found`, 404)
        }
    }

    async update(id: string, body: Partial<UserSchema>) {
        try {
            await this.collection.updateOne({_id: new ObjectId(id)},{$set: {...body}})
            const docById = await this.getById(id, 'User')
            return docById
        } catch (err) {
            throw error ('Internal Server Error', 500)  
        }
    }
}