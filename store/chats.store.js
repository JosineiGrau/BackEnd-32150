import knex from 'knex';
import error from "../src/utils/setError.js"
import { options } from "../src/options/mysqlconfig.js";

const database = knex(options.connection_mysqlite)

export class Store {
     constructor(tableName){
        this.tableName = tableName
     }

    async getAll() {
		try {
            const data = await database.from(`${this.tableName}`).select('*')

		    return data.map((item) => ({...item}))
        } catch (err) {
            console.log('Error DB :',err);
            throw error ('Internal Server Error', 500) 
        }
	}

    async save (item){
        try {
            const newItem = await database(`${this.tableName}`).insert(item)
            return newItem[0]
        }catch(err){
            console.log('Error DB :',err);
           throw error ('Internal Server Error', 500)        
        }
    }
}
