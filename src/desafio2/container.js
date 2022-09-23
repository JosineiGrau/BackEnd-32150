const fs = require('fs');

class Container {
	constructor(nameFile) {
		this.nameFile = nameFile;
	}

	async save(product) {
		try {
			if (fs.existsSync(this.nameFile)) {
				const contenido = await fs.promises.readFile(this.nameFile, 'utf-8');
				if (contenido) {
					const data = JSON.parse(contenido);
					const lastIdAdded = (data.lastId += 1);
					const newProduct = {
						id: lastIdAdded,
						...product,
					};
					data.productos.push(newProduct);
					await fs.promises.writeFile(
						this.nameFile,
						JSON.stringify(
							{ lastId: lastIdAdded, productos: data.productos },
							null,
							2
						)
					);
				} else {
					const newProduct = {
						id: 1,
						...product,
					};
					await fs.promises.writeFile(
						this.nameFile,
						JSON.stringify({ lastId: 1, productos: [newProduct] }, null, 2)
					);
				}
			} else {
				const newProduct = {
					id: 1,
					...product,
				};
				await fs.promises.writeFile(
					this.nameFile,
					JSON.stringify({ lastId: 1, productos: [newProduct] }, null, 2)
				);
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
				return (
					data.productos.find((item) => item.id === id) ||
					new Error('No se encontró el id que busca')
				);
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
				return data.productos;
			} else {
				throw new Error('No se encontró ningún producto mostrar');
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
				const newProductList = data.productos.filter((item) => item.id !== id);
				await fs.promises.writeFile(
					this.nameFile,
					JSON.stringify(
						{ lastId: data.lastId, productos: newProductList },
						null,
						2
					)
				);
			} else {
				throw new Error('No se encontró ningún producto para borrar');
			}
		} catch (error) {
			console.log(error);
		}
	}

	async deleteAll() {
		try {
			await fs.promises.writeFile(
				this.nameFile,
				JSON.stringify({ lastId: 0, productos: [] }, null, 2)
			);
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = Container;
