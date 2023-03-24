import { FsStore } from "../../managers/fs.manager.js";
import fs from 'fs';
import moment from "moment/moment.js";
import error from "../../../utils/setError.js";

export class CartsFsDao extends FsStore {
    // eslint-disable-next-line no-useless-constructor
    constructor(nameFile) {
        super(nameFile)
    }

    async saveCart() {
		try {
			if (fs.existsSync(this.nameFile)) {
				const contenido = await fs.promises.readFile(this.nameFile, 'utf-8');
				if (contenido) {
					const data = JSON.parse(contenido);
					const id = this.addId(data);
					const newCart = {
						_id: id,
						timestamp: moment().format('DD/MM/YYYY HH:mm:ss A'),
						products: [],
					};
					data.push(newCart);
					await fs.promises.writeFile(
						this.nameFile,
						JSON.stringify(data, null, 2)
					);
					return newCart;
				} else {
					const newCart = {
						_id: 1,
						timestamp: moment().format('DD/MM/YYYY HH:mm:ss A'),
						products: [],
					};
					await fs.promises.writeFile(
						this.nameFile,
						JSON.stringify([newCart], null, 2)
					);
					return newCart;
				}
			} else {
				const newCart = {
					_id: 1,
					timestamp: moment().format('DD/MM/YYYY HH:mm:ss A'),
					products: [],
				};
				await fs.promises.writeFile(
					this.nameFile,
					JSON.stringify([newCart], null, 2)
				);
				return newCart;
			}
		} catch (err) {
			throw error('Internal Server Error', 500);
		}
	}

	async addProductToCart(cartId, product) {
		try {

			const contenido = await fs.promises.readFile(this.nameFile, 'utf-8');
			const carts = JSON.parse(contenido);

			const cart = await this.getById(cartId);
            if (cart.products.some((item) => item._id === product._id)) {
                const { products } = cart
                const cartUpdate = products.map((prod) => {
                    if (prod._id === product._id) {
                        const productUpdate = {...prod, stock: prod.stock + product.stock};
                        return productUpdate
                    } else {
                        return prod;
                    }
                });
                cart.products = cartUpdate
            } else {
                cart.products.push(product)
            }

			const index = carts.findIndex((item) => item._id === cart._id);
			carts[index] = cart;

			await fs.promises.writeFile(
				this.nameFile,
				JSON.stringify(carts, null, 2)
			);

			return cart;
		} catch (err) {
			throw error('Internal Server Error', 500);
		}
	}

	async deleteProductToCart(cart, product) {
		try {
            const { _id: cartId} = cart;
            const { _id: productId} = product;
			const contenido = await fs.promises.readFile(this.nameFile, 'utf-8');
			const carts = JSON.parse(contenido);
            
            if (cart?.products?.some((item) => item._id === product._id)) {
                const newProductsCart = cart.products.filter(
                    (item) => item._id !== parseInt(productId)
                );
                cart.products = newProductsCart;
    
                const indexCart = carts.findIndex((item) => item._id === parseInt(cartId));
                carts[indexCart] = cart;
    
                await fs.promises.writeFile(
                    this.nameFile,
                    JSON.stringify(carts, null, 2)
                );
                return true
            } else return false

		} catch (error) {
			throw error('Internal Server Error', 500);
		}
	}
}
