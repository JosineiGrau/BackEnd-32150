const fs = require('fs');

class Container {
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
			if (fs.existsSync(this.nameFile)) {
				const contenido = await fs.promises.readFile(this.nameFile, 'utf-8');
				if (contenido) {
					const data = JSON.parse(contenido);
					const id = this.addId(data);
					const newProduct = {
						id,
						...product,
					};
					data.push(newProduct);
					await fs.promises.writeFile(
						this.nameFile,
						JSON.stringify(data, null, 2)
					);
					return data;
				} else {
					const newProduct = {
						id: 1,
						...product,
					};
					await fs.promises.writeFile(
						this.nameFile,
						JSON.stringify([newProduct], null, 2)
					);
					return newProduct;
				}
			} else {
				const newProduct = {
					id: 1,
					...product,
				};
				await fs.promises.writeFile(
					this.nameFile,
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
			const contenido = await fs.promises.readFile(this.nameFile, 'utf-8');
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
			const contenido = await fs.promises.readFile(this.nameFile, 'utf-8');
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
			const contenido = await fs.promises.readFile(this.nameFile, 'utf-8');
			if (contenido) {
				const data = JSON.parse(contenido);
				const newProductList = data.filter((item) => item.id !== id);
				await fs.promises.writeFile(
					this.nameFile,
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

	async deleteAll() {
		try {
			await fs.promises.writeFile(this.nameFile, JSON.stringify([]));
		} catch (error) {
			console.log(error);
		}
	}

	async updateProduct(id, body) {
		try {
			const contenido = await fs.promises.readFile(this.nameFile, 'utf-8');
			if (contenido) {
				const data = JSON.parse(contenido);
				const newArray = data.map((item) =>
					item.id === id ? { ...item, ...body } : item
				);
				await fs.promises.writeFile(
					this.nameFile,
					JSON.stringify(newArray, null, 2)
				);
				return newArray.find((item) => item.id === id) || null;
			} else {
				throw new Error('No se encontró ningún producto para actualizar');
			}
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports.Container = Container;
