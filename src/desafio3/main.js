// const Container = require('./container');

// const product = new Container('src/desafio3/productos.txt');

// const addProduct = async () => {
// 	try {
// 		const newProduct = {
// 			title: 'Escuadra',
// 			price: 123.45,
// 			thumbnail:
// 				'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
// 		};
// 		await product.save(newProduct);
// 		getProduct(1);
// 		getProducts();
// 		deleteProduct(3);
// 		deleteProducts();
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
// const getProduct = (n) => {
// 	setTimeout(async () => {
// 		const productId = await product.getById(n);
// 		console.log(productId);
// 	}, 1500);
// };

// const getProducts = () => {
// 	setTimeout(async () => {
// 		const products = await product.getAll();
// 		console.log(products);
// 	}, 2500);
// };
// const deleteProduct = (n) => {
// 	setTimeout(async () => {
// 		await product.deleteById(n);
// 	}, 3500);
// };
// const deleteProducts = () => {
// 	setTimeout(async () => {
// 		await product.deleteAll();
// 	}, 4500);
// };
// addProduct();
