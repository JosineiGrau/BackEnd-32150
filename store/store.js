import error from "../src/utils/setError.js"
import knex from 'knex';
import { options } from "../src/options/mysqlconfig.js";
const database = knex(options.connection_MariaDB)

export class Store {
     constructor(tableName){
        this.tableName = tableName
     }

    async getAll() {
		try {
            const data = await database.from(`${this.tableName}`).select('*')

		    return data.map((item) => ({...item}))
        } catch (error) {
            throw error ('Internal Server Error', 500) 
        }
	}

    async getById(id) {
		try {
            const data = await database.from(`${this.tableName}`).where('id',id)
    
		    return data
        } catch (error) {
            throw error ('Internal Server Error', 500) 
        }
	}

    async save (item){
        try {
            const newItem = await database(`${this.tableName}`).insert(item)
            
            return newItem[0]
        }catch(err){
           throw error ('Internal Server Error', 500)        
        }
    }

    async deleteById(id) {
		try {
            await database(`${this.tableName}`).where('id','=',id).del()
        } catch (err) {
            throw error ('Internal Server Error', 500)
        }
	}

    async update(id, body) {
		try {
            await database(`${this.tableName}`).where('id','=',id).update(body)
        } catch (err) {
            throw error ('Internal Server Error', 500)
        }
	}
}
