import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

export const mongo = () => {
    mongoose.connect(process.env.DB_MONGO_url,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if(err) return console.log('Hubo un error al conectarse a la base de datos')
        console.log('Conexión a la base de datos de manera exitosa')
    })
} 