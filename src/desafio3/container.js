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
				} else {
					const newProduct = {
						id: 1,
						...product,
					};
					await fs.promises.writeFile(
						this.nameFile,
						JSON.stringify([newProduct], null, 2)
					);
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
					data.find((item) => item.id === id) ||
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
				return data;
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
				const newProductList = data.filter((item) => item.id !== id);
				await fs.promises.writeFile(
					this.nameFile,
					JSON.stringify(newProductList, null, 2)
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
			await fs.promises.writeFile(this.nameFile, JSON.stringify([]));
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = Container;
