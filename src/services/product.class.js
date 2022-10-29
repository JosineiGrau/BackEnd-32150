import fs from 'fs';
import moment from 'moment';

export class Products {
	constructor(nameFile) {
		this.nameFile = nameFile;
	}

	addId(data) {
		const ids = data.map((item) => item.id);
		const maxId = Math.max(...ids);
		let addId = maxId === -Infinity ? 0 : maxId;
		addId++;
		return addId;
	}

	async save(product) {
		try {
			if (fs.existsSync(`./src/db/${this.nameFile}`)) {
				const contenido = await fs.promises.readFile(`./src/db/${this.nameFile}`, 'utf-8');
				if (contenido) {
					const data = JSON.parse(contenido);
					const id = this.addId(data);
					const newProduct = {
						id,
						timestamp: moment().format('DD/MM/AAAA HH:mm:ss A'),
						...product,
					};
					data.push(newProduct);
					await fs.promises.writeFile(
						`./src/db/${this.nameFile}`,
						JSON.stringify(data, null, 2)
					);
					return data;
				} else {
					const newProduct = {
						id: 1,
						timestamp: moment().format('DD/MM/AAAA HH:mm:ss A'),
						...product,
					};
					await fs.promises.writeFile(
						`./src/db/${this.nameFile}`,
						JSON.stringify([newProduct], null, 2)
					);
					return newProduct;
				}
			} else {
				const newProduct = {
					id: 1,
					timestamp: moment().format('DD/MM/AAAA HH:mm:ss A'),
					...product,
				};
				await fs.promises.writeFile(
					`./src/db/${this.nameFile}`,
					JSON.stringify([newProduct], null, 2)
				);
				return newProduct;
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
				throw new Error('No se encontró ningún id para mostrar');
			}
		} catch (error) {
			console.log(error);
		}
	}

	async getAll() {
		try {
			const contenido = await fs.promises.readFile(`./src/db/${this.nameFile}`, 'utf-8');
			if (contenido) {
				const data = JSON.parse(contenido);
				return data;
			} else {
				throw new Error('No se encontró ningún producto a mostrar');
			}
		} catch (error) {
			console.log(error);
		}
	}

	async deleteById(id) {
		try {
			const contenido = await fs.promises.readFile(`./src/db/${this.nameFile}`, 'utf-8');
			if (contenido) {
				const data = JSON.parse(contenido);
				const newProductList = data.filter((item) => item.id !== id);
				await fs.promises.writeFile(
					`./src/db/${this.nameFile}`,
					JSON.stringify(newProductList, null, 2)
				);
				return data.find((item) => item.id === id) || null;
			} else {
				throw new Error('No se encontró ningún producto para borrar');
			}
		} catch (error) {
			console.log(error);
		}
	}

	async updateProduct(id, body) {
		try {
			// producto a actualizar
			const product = await this.getById(id)
			
			const contenido = await fs.promises.readFile(`./src/db/${this.nameFile}`, 'utf-8');

			if (contenido) {
				const data = JSON.parse(contenido);

				const newProduct = {
					id: product.id,
					timestamp: product.timestamp
				}

				// Nos aseguramos de que no metan cosas que no pedimos
				// Si no viene por el body el dato, va a seguir siendo el de la base de datos
				newProduct.name = (!body.name) ? product.name : body.name 
				newProduct.description = (!body.description) ? product.description : body.description
				newProduct.price = (!body.code) ? product.code : body.code
				newProduct.price = (!body.price) ? product.price : body.price
				newProduct.image = (!body.image) ? product.image : body.image
				newProduct.stock = (!body.stock) ? product.stock : body.stock


				const index = data.findIndex(item => item.id === id)
				data[index] = newProduct

				await fs.promises.writeFile(
					`./src/db/${this.nameFile}`,
					JSON.stringify(data, null, 2)
				);

				return newProduct
			} else {
				throw new Error('No se encontró ningún producto para actualizar');
			}
		} catch (err) {
			console.log(err);
		}
	}
}

// principios solid