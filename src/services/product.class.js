import error from '../utils/setError.js';
import { Store } from '../../store/store.js'

const store = new Store('productos')

export class Products {
	constructor(tableName) {
		this.tableName = tableName;
	}

	async getAll() {
		const products = await store.getAll()
		return products
	}

	async getById(id) {
		const data = await store.getById(id)
		if(data.length <= 0){
			throw error('producto no encontrado',400)
		} 

		return data
	}

	async save(product) {
		const newProduct = {
			...product,
		};

		const id = await store.save(newProduct)
		return {
			id,
			...newProduct
		}

	}

	async deleteById(id) {
		const data = await this.getById(id)
		await store.deleteById(id)

		return data
	}

	async updateProduct(id, body) {

		const product = await this.getById(id)

		const newProducto = {
			name: (!body.name) ? product.name : body.name,
			description: (!body.description) ? product.description : body.description,
			code: (!body.code) ? product.code : body.code,
			price: (!body.price) ? product.price : body.price,
			image: (!body.image) ? product.image : body.image,
			stock: (!body.stock) ? product.stock : body.stock
		}

		await store.update(id,newProducto)

		const upProduct = await this.getById(id)

		return upProduct
	}
}

// principios solid