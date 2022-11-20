import mongoose from "mongoose";

const cartsCollection = 'Carts'

const cartsSchema = new mongoose.Schema({
    time_stamp: {type: String, require: false,},
    products: [
        {
            name: {type: String, require: true, max: 1000000},
            code: {type: Number, require: true, max: 5000000},
            price: {type: Number, require: true, max: 1000000000},
            description: {type: String, require: true, max: 1000000},
            image: {type: String, require: true, max: 1000000},
            stock: {type: Number, require: true, max: 100000000},
            time_stamp: {type: String, require: false,}
        },
    ]
})

export const carts = mongoose.model(cartsCollection, cartsSchema)