const mongoose = require('mongoose');

const productsCollection = 'Products'

const productsSchema = new mongoose.Schema({
    name: {type: String, require: true, max: 1000000},
    code: {type: Number, require: true, max: 5000000},
    price: {type: Number, require: true, max: 100000000},
    description: {type: String, require: true, max: 1000000},
    image: {type: String, require: true, max: 1000000},
    stock: {type: Number, require: true, max: 100000000},
    time_stamp: {type: String, require: false,},
})

const productsModel = mongoose.model(productsCollection, productsSchema)
module.exports = productsModel