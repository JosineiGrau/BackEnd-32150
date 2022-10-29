import fs from 'fs';
import moment from 'moment';
import { Products } from './product.class.js';
const products = new Products('products.json')

export class Carts {
    constructor(nameFile){
        this.nameFile = nameFile;
    }

    addId(data) {
		const ids = data.map((item) => item.id);
		const maxId = Math.max(...ids);
		let addId = maxId === -Infinity ? 0 : maxId;
		addId++;
		return addId;
	}

    async save() {
        if(fs.existsSync(`./src/db/${this.nameFile}`)) {
            try {
                if (fs.existsSync(`./src/db/${this.nameFile}`)) {
                    const contenido = await fs.promises.readFile(`./src/db/${this.nameFile}`, 'utf-8');
                    if (contenido) {
                        const data = JSON.parse(contenido);
                        const id = this.addId(data);
                        const newCart = {
                            id,
                            timestamp: moment().format('DD/MM/YYYY HH:mm:ss A'),
                            products: [],
                        };
                        data.push(newCart);
                        await fs.promises.writeFile(
                            `./src/db/${this.nameFile}`,
                            JSON.stringify(data, null, 2)
                        );
                        return newCart.id;
                    } else {
                        const newCart = {
                            id: 1,
                            timestamp: moment().format('DD/MM/YYYY HH:mm:ss A'),
                            products: [],
                        };
                        await fs.promises.writeFile(
                            `./src/db/${this.nameFile}`,
                            JSON.stringify([newCart], null, 2)
                        );
                        return newCart.id;
                    }
                } else {
                    const newCart = {
                        id: 1,
                        timestamp: moment().format('DD/MM/YYYY HH:mm:ss A'),
                        products: [],
                    };
                    await fs.promises.writeFile(
                        `./src/db/${this.nameFile}`,
                        JSON.stringify([newCart], null, 2)
                    );
                    return newCart.id;
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    async getAll() {
		try {
			const contenido = await fs.promises.readFile(`./src/db/${this.nameFile}`, 'utf-8');
			if (contenido) {
				const data = JSON.parse(contenido);
				return data;
			} else {
				throw new Error('No se encontró ningún carrito a mostrar');
			}
		} catch (error) {
			console.log(error);
		}
	}

    async addProduct (id, body) {
        try {
			const contenido = await fs.promises.readFile(`./src/db/${this.nameFile}`, 'utf-8');
			if (contenido) {
                const cart = await this.getById(id);
				const carts = JSON.parse(contenido);

                const product = await products.getById(body.id)
                if(product){
                    if(product.stock > 0) {
                        cart.products.push(product)
                    } else {
                        throw new Error('Producto sin stock')
                    }
                } else {
                    throw new Error('No existe el producto que desea agregar')
                }

                const index = carts.findIndex(item => item.id === cart.id);
                carts[index] = cart

                await fs.promises.writeFile(
					`./src/db/${this.nameFile}`,
					JSON.stringify(carts, null, 2)
				);

                return cart

			} else {
				throw new Error('No se encontró ningún producto para agregar');
			}
		} catch (error) {
			console.log(error);
		}
    }

    async getById(id) {
		try {
			const contenido = await fs.promises.readFile(`./src/db/${this.nameFile}`, 'utf-8');
			if (contenido) {
				const data = JSON.parse(contenido);
				return data.find((item) => item.id === id) || null;
			} else {
				throw new Error('No se encontró ningún carrito para mostrar');
			}
		} catch (error) {
			console.log(error);
		}
	}

    async deleteById(id) {
		try {
			const contenido = await fs.promises.readFile(`./src/db/${this.nameFile}`, 'utf-8');
			if (contenido) {
				const carts = JSON.parse(contenido);
				const newCartsList = carts.filter((item) => item.id !== id);
				await fs.promises.writeFile(
					`./src/db/${this.nameFile}`,
					JSON.stringify(newCartsList, null, 2)
				);
				return carts.find((item) => item.id === id) || null;
			} else {
				throw new Error('No se encontró ningún producto para borrar');
			}
		} catch (error) {
			console.log(error);
		}
	}

    async deleteProduct (cartId, productId) {
        try {
			const contenido = await fs.promises.readFile(`./src/db/${this.nameFile}`, 'utf-8');
			if (contenido) {
				const carts = JSON.parse(contenido);
                const cart = await this.getById(cartId);
                const productInCart = cart.products.find(item => item.id === productId || null)

                if (!productInCart) {
                    throw new Error('El producto no existe en el carrito')
                }
                const newProductsCart = cart.products.filter(item => item.id !== productId)
                cart.products = newProductsCart
                
                const indexCart = carts.findIndex(item => item.id === cartId)
                carts[indexCart] = cart

                await fs.promises.writeFile(
					`./src/db/${this.nameFile}`,
					JSON.stringify(carts, null, 2)
				);
                return cart
			} else {
				throw new Error('No se encontró el producto a borrar');
			}
		} catch (error) {
			console.log(error);
		}
    }

}