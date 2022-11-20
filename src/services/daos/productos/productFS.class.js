import { FsStore } from '../../../store/fsStore.js';
import error from '../../../utils/setError.js';

const products = new FsStore('db.json')

export class ProductsFS {
	async save(product) {
		const newProduct = await products.save(product)
        return newProduct
	}

	async getById(id) {
		const productId = await products.getById(parseInt(id))
        if(!productId) throw error('product not found', 404)
        return productId
	}

	async getAll() {
		const allProducts = await products.getAll()
        return allProducts
	}

	async deleteById(id) {
        await this.getById(id)
		const deleteProduct = await products.deleteById(parseInt(id))
        return deleteProduct
	}

	async update(id, body) {
        await this.getById(id)
		const updatedProduct = await products.update(parseInt(id), body)
        return updatedProduct
	}
}
