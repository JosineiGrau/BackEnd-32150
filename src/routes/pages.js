const { Router } = require('express');
const { Container } = require('../container');

const productsList = new Container('db.txt');

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

homeRouter.get('/postProducts', (req, res) => {
	res.status(200).render('postProducts');
});
homeRouter.post('/postProducts', async (req, res) => {
	try {
		const newProduct = req.body;
		await productsList.save(newProduct);
		res.status(201).redirect('/getProducts');
	} catch (err) {
		console.log(err);
	}
});

// homeRouter.post('/api/products', (req, res) => {});

module.exports.homeRouter = homeRouter;
