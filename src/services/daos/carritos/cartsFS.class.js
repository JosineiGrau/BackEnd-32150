import { FsStoreCarts } from '../../../store/fsStoreCarts.js';
import error from '../../../utils/setError.js';
import { ProductsFS } from '../productos/productFS.class.js';

const carts = new FsStoreCarts('carts.json')
const products = new ProductsFS()
export class CartsFS {
	async save() {
       const cart = await carts.save()
       return cart
    }

    async addProduct (id, body) {
        const productExist = await products.getById(parseInt(body.id))
        if(productExist) {
            if(productExist.stock > 0) {
                const addProduct = await carts.addProduct(parseInt(id), productExist)
                return addProduct
            } else {
                throw error('Producto sin stock', 400)
            }
        } else {
            throw error('product not found', 404)
        }
    }

    async getAll() {
		const allCarts = await carts.getAll()
        return allCarts
	}

    async getById(id) {
		const cartId = await carts.getById(parseInt(id))
        if(!cartId) throw error('cart not found', 404)
        return cartId
	}

    async deleteById(id) {
        await this.getById(id)
        const cartDelete = await carts.deleteById(parseInt(id))
        return cartDelete
	}

    async deleteProduct (cartId, productId) {
        const cart = await this.getById(cartId)
        const productInCart = cart.products.find(item => item.id === parseInt(productId))
        if(productInCart) {
            const productDelete = await carts.deleteProduct(parseInt(cartId),parseInt(productId))
            return productDelete
        } else {
            throw error('product not found', 404)
        }
    }
}
