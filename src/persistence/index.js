import { MongoClient } from '../clients/dbMongo.client.js';
import { cartsModel } from './models/carts.js';
import { productsModel } from './models/products.js';

export const getApiDao = async (dbType) => {
	let ProductsDaoContainer;
	let CartsDaoContainer;

	const client = new MongoClient();
	await client.connect();
	if (dbType === 'MONGO') {
		const { ProductsMongoDao } = await import(
			'./daos/products/productsMongoDao.js'
		);
		const { CartsMongoDao } = await import('./daos/carts/cartsMongoDao.js');
		ProductsDaoContainer = new ProductsMongoDao(productsModel);
		CartsDaoContainer = new CartsMongoDao(cartsModel);
	} else if (dbType === 'FS') {
		const { ProductsFsDao } = await import('./daos/products/productsFsDao.js');
		const { CartsFsDao } = await import('./daos/carts/cartsFsDao.js');
		ProductsDaoContainer = new ProductsFsDao('products.json');
		CartsDaoContainer = new CartsFsDao('carts.json');
	} else {
		console.log('BASE DE DATOS NO DISPONIBLE');
	}
	return {
		ProductsDaoContainer,
		CartsDaoContainer,
	};
};
