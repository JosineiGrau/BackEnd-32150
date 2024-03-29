import fs from 'fs';
import error from '../../utils/setError.js';

export class FsStore {
	constructor(nameFile) {
		this.nameFile = nameFile;
	}

	addId(data) {
		const ids = data.map((item) => item._id);
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
						_id: id,
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
						_id: 1,
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
					_id: 1,
					...product,
				};
				await fs.promises.writeFile(
					this.nameFile,
					JSON.stringify([newProduct], null, 2)
				);
				return newProduct;
			}
		} catch (err) {
			throw error('Internal Server Error', 500);
		}
	}

	
	async getById(id) {
		try {
			const contenido = await fs.promises.readFile(this.nameFile, 'utf-8');
			const data = JSON.parse(contenido);
			const dataById = data.find((item) => item._id === parseInt(id));
			return dataById;
		} catch (err) {
			throw error('Internal Server Error', 500);
		}
	}

	async getAll() {
		try {
			const contenido = await fs.promises.readFile(this.nameFile, 'utf-8');
			const datas = JSON.parse(contenido);
			return datas;
		} catch (err) {
			throw error('Internal Server Error', 500);
		}
	}

	async deleteById(id) {
		try {
			const contenido = await fs.promises.readFile(this.nameFile, 'utf-8');
			const data = JSON.parse(contenido);
			const newDataList = data.filter((item) => item._id !== parseInt(id));
			await fs.promises.writeFile(
				this.nameFile,
				JSON.stringify(newDataList, null, 2)
			);
		} catch (err) {
			throw error('Internal Server Error', 500);
		}
	}

	async update(id, body) {
		try {
			const contenido = await fs.promises.readFile(this.nameFile, 'utf-8');

			const data = JSON.parse(contenido);
			const newArray = data.map((item) =>
				item._id === parseInt(id) ? { ...item, ...body } : item
			);
			await fs.promises.writeFile(
				this.nameFile,
				JSON.stringify(newArray, null, 2)
			);
			return newArray.find((item) => item._id === parseInt(id));
		} catch (err) {
			throw error('Internal Server Error', 500);
		}
	}
}
