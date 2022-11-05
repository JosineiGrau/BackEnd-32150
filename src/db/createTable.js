import knex from "knex"
import { options } from "../options/mysqlconfig.js";

const dbMariaDB = knex(options.connection_MariaDB)
export const createTableProduct = async () => {
    const exists = await dbMariaDB.schema.hasTable('productos')
    if(!exists){
        await dbMariaDB.schema.createTable('productos',(table)=>{
            table.increments('id')
            table.timestamp('create_time_stamp').nullable(false).defaultTo(dbMariaDB.fn.now())
            table.timestamp('updated_time_stamp').nullable(false).defaultTo(dbMariaDB.fn.now())
            table.string('name',150).nullable(false)
            table.float('price',).nullable(false)
            table.text('description').nullable(false)
            table.string('image',120).nullable(false)
            table.integer('stock',10).nullable(false)
            table.string('code',115).nullable(false)
        })

        console.log('Tabla productos creada');
        await dbMariaDB.destroy()
    }
}

const dbMysqLite = knex(options.connection_mysqlite)
export const createTableChats = async () => {
    const exists = await dbMysqLite.schema.hasTable('chat')

    if(!exists){
        await dbMysqLite.schema.createTable('chat',(table)=>{
            table.increments('id')
            table.string('username',200).nullable(false)
            table.text('message').nullable(false)
        })
        console.log('Tabla chat creada');
        await dbMysqLite.destroy()
    }
}
