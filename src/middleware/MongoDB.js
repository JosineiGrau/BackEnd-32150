import mongoose from "mongoose"

const URL = 'mongodb+srv://josinei:Lilgrau1566@coderhouse.xjsf45t.mongodb.net/authDB?retryWrites=true&w=majority'

export const mongo = () => {
    mongoose.connect(URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if(err) return console.log('Hubo un error al conectarse a la base de datos')
        console.log('Conexión a la base de datos de manera exitosa')
    })
} 