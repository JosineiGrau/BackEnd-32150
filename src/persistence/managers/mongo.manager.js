import error from '../../utils/setError.js';

export class MongoStore {
	constructor(collectionModel) {
		this.collectionModel = collectionModel;
	}

	async save(item) {
		try {
			const result = await this.collectionModel.create(item);
			return result;
		} catch (err) {
			throw error('Internal Server Error', 500);
		}
	}


	async getAll() {
		try {
			const result = await this.collectionModel.find({});
			return result;
		} catch (err) {
			throw error('Internal Server Error', 500);
		}
	}

	async getById(id) {
		try {
			const result = await this.collectionModel.find({ _id: id });
			return result[0];
		} catch (err) {
			throw error('Internal Server Error', 500);
		}
	}

	async deleteById(id) {
		try {
			await this.collectionModel.deleteOne({ _id: id });
		} catch (err) {
			throw error('Internal Server Error', 500);
		}
	}

	async update(id, body) {
		try {
			await this.collectionModel.updateOne({ _id: id }, { $set: { ...body } });
			const docById = await this.getById(id);
			return docById;
		} catch (err) {
			throw error('Internal Server Error', 500);
		}
	}

}
