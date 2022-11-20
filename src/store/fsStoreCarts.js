import fs from 'fs'
import moment from 'moment';
import error from '../utils/setError.js';

export class FsStoreCarts {
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
            try {
                if (fs.existsSync(this.nameFile)) {
                    const contenido = await fs.promises.readFile(this.nameFile, 'utf-8');
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
                            this.nameFile,
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
                            this.nameFile,
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
                        this.nameFile,
                        JSON.stringify([newCart], null, 2)
                    );
                    return newCart.id;
                }
            } catch (err) {
                throw error ('Internal Server Error', 500) 
            }
        
    }

    async addProduct (id, body) {
        try {
			const contenido = await fs.promises.readFile(this.nameFile, 'utf-8');
            const cart = await this.getById(id);
			const carts = JSON.parse(contenido);
            
      
            cart.products.push(body)
               

             const index = carts.findIndex(item => item.id === cart.id);
            carts[index] = cart

            await fs.promises.writeFile(
				this.nameFile,
				JSON.stringify(carts, null, 2)
			);

             return cart

		} catch (err) {
            throw error ('Internal Server Error', 500) 
		}
    }

    async getAll() {
		try {
			const contenido = await fs.promises.readFile(this.nameFile, 'utf-8');
			const data = JSON.parse(contenido);
			return data;
		} catch (err) {
            throw error ('Internal Server Error', 500) 
		}
	}

    async getById(id) {
		try {
			const contenido = await fs.promises.readFile(this.nameFile, 'utf-8');
			const data = JSON.parse(contenido);
			return data.find((item) => item.id === id);
		} catch (err) {
			throw error ('Internal Server Error', 500) 

		}
	}

    async deleteById(id) {
		try {
			const contenido = await fs.promises.readFile(this.nameFile, 'utf-8');
	
			const carts = JSON.parse(contenido);
			const newCartsList = carts.filter((item) => item.id !== id);
			await fs.promises.writeFile(
				this.nameFile,
				JSON.stringify(newCartsList, null, 2)
			);
			return carts.find((item) => item.id === id);
			
		} catch (err) {
			throw error ('Internal Server Error', 500) 

		}
	}

    async deleteProduct (cartId, productId) {
        try {
			const contenido = await fs.promises.readFile(this.nameFile, 'utf-8');
			
			const carts = JSON.parse(contenido);
            const cart = await this.getById(cartId);

            const newProductsCart = cart.products.filter(item => item.id !== productId)
            cart.products = newProductsCart
                
            const indexCart = carts.findIndex(item => item.id === cartId)
            carts[indexCart] = cart

            await fs.promises.writeFile(
				this.nameFile,
				JSON.stringify(carts, null, 2)
			);
            return cart
			
		} catch (error) {
		    throw error ('Internal Server Error', 500) 

		}
    }

}