const Container = require('./container');

const product = new Container('src/desafio2/productos.txt');

const addProduct = async () => {
	try {
		const newProduct = {
			nombre: 'iPhone 13 Pro Max',
			price: 6000,
			image:
				'https://www.mac-center.com.pe/ccstore/v1/images/?source=/file/v3730842798540002646/products/iPhone_13_Pro_Verde-1.jpeg',
		};
		// este producto es de prueba por que está repetido
		const newProduct2 = {
			nombre: 'iPhone 13 Pro Max',
			price: 6000,
			image:
				'https://www.mac-center.com.pe/ccstore/v1/images/?source=/file/v3730842798540002646/products/iPhone_13_Pro_Verde-1.jpeg',
		};
		await product.save(newProduct);
		await product.save(newProduct2);
		getProduct();
		getProducts();
		deleteProduct();
		deleteProducts();
	} catch (error) {
		console.log(error);
	}
};
const getProduct = () => {
	setTimeout(async () => {
		const productId = await product.getById(1);
		console.log(productId);
	}, 1500);
};

const getProducts = () => {
	setTimeout(async () => {
		const products = await product.getAll();
		console.log(products);
	}, 2500);
};
const deleteProduct = () => {
	setTimeout(async () => {
		await product.deleteById(1);
	}, 3500);
};
const deleteProducts = () => {
	setTimeout(async () => {
		await product.deleteAll();
	}, 4500);
};
addProduct();
