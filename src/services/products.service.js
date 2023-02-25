import { getApiDao } from '../persistence/index.js';
import config from '../config/config.js';
import error from '../utils/setError.js';


const { ProductsDaoContainer } = await getApiDao(config.server.dbType)

export const productsRoot = {
    getAllProducts: async () => {
        const allProducts = await ProductsDaoContainer.getAll()
        return allProducts
    },
    getProductById: async ({ id }) => {
        const productId = await ProductsDaoContainer.getById(parseInt(id))
        if(!productId) throw error('product not found',404)
        return productId
    },
    saveProduct: async ({ product }) => {
        const newProduct = await ProductsDaoContainer.save(product)
        return newProduct
    },
    updateProduct: async ({id, body}) => {
        const updatedProduct = await ProductsDaoContainer.update(parseInt(id), body)
        return updatedProduct
    },
    deleteProductById: async ({ id }) => {
        const deleteProduct = await ProductsDaoContainer.deleteById(parseInt(id))
        return deleteProduct
    },
}
