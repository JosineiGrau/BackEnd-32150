const MongoStore = require('./managers/mongo.manager');
const productsModel = require('./models/products.model');
const cartsModel = require('./models/carts.model');

const productos = new MongoStore(productsModel)
const carritos = new MongoStore(cartsModel)

module.exports = {
    productos,
    carritos
}