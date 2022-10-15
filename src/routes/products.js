const { Container } = require('../container');
const { Router } = require('express');
const productsRoute = Router();

const productsList = new Container('db.txt');

// GET
productsRoute.get('/', async (req, res) => {
	try {
		const allProducts = await productsList.getAll();
		if (allProducts) {
			res.status(200).json({
				message: 'Estos son todos los productos',
				allProducts,
			});
		} else {
			res.status(404).json({
				error: 'No encontramos ningún producto',
			});
		}
	} catch (err) {
		console.log(err);
	}
});

productsRoute.get('/:productId', async (req, res) => {
	try {
		const { productId } = req.params;
		const productById = await productsList.getById(parseInt(productId));
		if (productById) {
			res.status(200).json({
				message: 'Estos son todos los productos',
				productById,
			});
		} else {
			res.status(404).json({
				error: 'No encontramos ningún producto',
			});
		}
	} catch (err) {
		console.log(err);
	}
});

// POST
productsRoute.post('/', async (req, res) => {
	try {
		const newProduct = req.body;

		if (JSON.stringify(newProduct) !== '{}') {
			const productById = await productsList.save(newProduct);
			res.status(201).json({
				message: 'Producto Agregado',
				assignedId: productById.id,
			});
		} else {
			res.status(400).json({
				error: 'Producto no agregado porque debes completar todos los campos',
			});
		}
	} catch (err) {
		console.log(err);
	}
});

// PUT
productsRoute.put('/:productId', async (req, res) => {
	try {
		const { productId } = req.params;
		const updateProduct = req.body;
		const updatedProduct = await productsList.updateProduct(
			parseInt(productId),
			updateProduct
		);
		console.log(updatedProduct);
		if (updatedProduct) {
			res.status(200).json({
				message: 'Producto actualizado',
				updatedProduct,
			});
		} else {
			res.status(404).json({
				error: 'No se puede actualizar el producto porque no existe',
			});
		}
	} catch (err) {
		console.log(err);
	}
});

// DELETE
productsRoute.delete('/:productId', async (req, res) => {
	try {
		const { productId } = req.params;
		const productById = await productsList.deleteById(parseInt(productId));
		if (productById) {
			res.status(200).json({
				message: 'Producto eliminado exitosamente',
				deletedProductId: productById.id,
			});
		} else {
			res.status(404).json({
				error: 'No existe el producto que desea eliminar',
			});
		}
	} catch (err) {
		console.log(err);
	}
});

module.exports.productsRoutes = productsRoute;
