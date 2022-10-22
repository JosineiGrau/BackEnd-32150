const { Router } = require('express');
const { Container } = require('../container');
const { Message } = require('../message');

const productsList = new Container('db.txt');
const messages = new Message('messages.txt');

const homeRouter = Router();

homeRouter.get('/', (req, res) => {
	res.render('index');
});
homeRouter.get('/api', async (req, res) => {
	try {
		const allProducts = await productsList.getAll();
		res.render('api', {
			allProducts,
		});
	} catch (err) {
		console.log(err);
	}
});
homeRouter.get('/getProducts', async (req, res) => {
	try {
		const allProducts = await productsList.getAll();
		res.render('getProducts', {
			allProducts,
		});

		!allProducts &&
			res.status(404).json({ error: 'No encontramos ningún producto' });
	} catch (err) {
		console.log(err);
	}
});

homeRouter.get('/postProducts', async (req, res) => {
	try {
		const allProducts = await productsList.getAll();
		console.log(allProducts);
		res.render('postProducts', {
			allProducts,
		});

		// !allProducts &&
		// 	res.status(404).json({ error: 'No encontramos ningún producto' });
	} catch (err) {
		console.log(err);
	}
});
// homeRouter.post('/postProducts', async (req, res) => {
// 	try {
// 		const newProduct = req.body;
// 		await productsList.save(newProduct);
// 		res.status(201).redirect('/getProducts');
// 	} catch (err) {
// 		console.log(err);
// 	}
// });
homeRouter.get('/message', async (req, res) => {
	try {
		const allMessages = await messages.getAll()
		res.render('messages',{
			allMessages
		})
		!allMessages &&
			res.status(404).json({ error: 'No encontramos ningún mensaje' });
	} catch (error) {
		console.log(error);
	}
});

// homeRouter.post('/api/products', (req, res) => {});

module.exports.homeRouter = homeRouter;
