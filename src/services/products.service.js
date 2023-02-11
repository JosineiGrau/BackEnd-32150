const error = require('../utils/setError');
const getApiDao = require('../persistence/index');
const config = require('../config/config');

let db;

getApiDao(config.server.dbType).then((data) => {
  db = data.ProductsDaoContainer
})

const saveProduct = async (product) => {
	const newProduct = await db.save(product)
    return newProduct
}

const getProductById = async (id) => {
	const productId = await db.getById(parseInt(id))
    if(!productId) throw error('product not found',404)
    return productId
}

const getAllProducts = async () => {
	const allProducts = await db.getAll()
    return allProducts
}

const deleteProductById = async (id) => {
    await this.getById(id)
	const deleteProduct = await db.deleteById(parseInt(id))
    return deleteProduct
}

const updateProduct = async (id, body) => {
    await this.getById(id)
	const updatedProduct = await db.update(parseInt(id), body)
    return updatedProduct
}


module.exports = {
	saveProduct,
	getProductById,
	getAllProducts,
	deleteProductById,
	updateProduct
}