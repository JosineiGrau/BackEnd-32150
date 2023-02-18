import { getApiDao } from '../persistence/index.js';
import config from '../config/config.js';
import error from '../utils/setError.js';


const { ProductsDaoContainer } = await getApiDao(config.server.dbType)

export const saveProduct = async (product) => {
	const newProduct = await ProductsDaoContainer.save(product)
    return newProduct
}

export const getProductById = async (id) => {
	const productId = await ProductsDaoContainer.getById(parseInt(id))
    if(!productId) throw error('product not found',404)
    return productId
}

export const getAllProducts = async () => {
	const allProducts = await ProductsDaoContainer.getAll()
    return allProducts
}

export const deleteProductById = async (id) => {
    await getProductById(id)
	const deleteProduct = await ProductsDaoContainer.deleteById(parseInt(id))
    return deleteProduct
}

export const updateProduct = async (id, body) => {
    await getProductById(id)
	const updatedProduct = await ProductsDaoContainer.update(parseInt(id), body)
    return updatedProduct
}
