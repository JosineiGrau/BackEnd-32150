const { Router } = require('express');
const { deleteProduct, getProduct, updateProduct, validationCreate } = require('../../utils/productValidate');
const { checkSession, checkRol } = require('../../middleware/auth');
const success = require('../../networks/responses');
const Products = require('../../services/daos/products/productsMongo.daos');

const db = new Products()

const productsRoute = Router(); 

// GET
productsRoute.get('/', checkSession, async(req, res, next) => {
	try {
		const allProducts = await db.getAll();
		success(res,200,'Estos son todos los productos',allProducts)
	} catch (err) {
		next(err)
	}
});

productsRoute.get('/:productId', checkSession, getProduct, async (req, res, next) => {
	try {
		const { productId } = req.params;
		const productById = await db.getById(productId);
		success(res,200,'El producto Obtenido',productById)

	}
	catch(err) {
		next(err)
	}
});

productsRoute.post('/', checkRol, checkSession, validationCreate, async (req, res, next) => {
	try {
		const newProduct = req.body;
		const getProducts = await db.save(newProduct);
		success(res,201,'Producto Agregado',getProducts)
	} catch (err) {
		next(err)
	}
})


// DELETE
productsRoute.delete('/:productId', deleteProduct, checkRol, checkSession, async (req, res, next) => {
	try {
		const { productId } = req.params;
		const deleteProduct = await db.deleteById(productId);
		success(res,200,'Producto eliminado exitosamente',deleteProduct )	

	} catch (err) {
		next(err)
	}
});

// PUT
productsRoute.put('/:productId', checkRol, checkSession, updateProduct , async (req, res, next) => {
	try {
		const { productId } = req.params;
		const updateProduct = req.body;
		const updatedProduct = await db.update(
			productId,
			updateProduct
		);
		success(res,200,'Producto actualizado',updatedProduct)
	} catch (err) {
		next(err)
	}
});

module.exports = productsRoute;