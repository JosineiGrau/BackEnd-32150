import mongoose from "mongoose";
import { config } from "./config.js";
export const conecctionMongo = () => {
    mongoose.connect(config.mongo.ulr,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (error) => {
        if(error) throw new Error(`Conexión fallida ${error}`)
        console.log('Conexión exitosa');
    })
}