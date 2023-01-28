const success = require("../networks/responses");
const Products = require('../services/daos/products/productsMongo.daos');

const db = new Products()

const getProductsController = async (req, res, next) => {
    try {
		const allProducts = await db.getAll();
		success(res,200,'Estos son todos los productos',allProducts)
	} catch (err) {
		next(err)
	}
}

const getProductController = async (req, res, next) => {
    try {
		const { productId } = req.params;
		const productById = await db.getById(productId);
		success(res,200,'El producto Obtenido',productById)

	}
	catch(err) {
		next(err)
	}
}

const postProductController = async (req, res, next) => {
    try {
		const newProduct = req.body;
		const getProducts = await db.save(newProduct);
		success(res,201,'Producto Agregado',getProducts)
	} catch (err) {
		next(err)
	}
}

const deleteProductController = async (req, res, next) => {
    try {
		const { productId } = req.params;
		const deleteProduct = await db.deleteById(productId);
		success(res,200,'Producto eliminado exitosamente',deleteProduct )	

	} catch (err) {
		next(err)
	}
}

const putProductController = async (req, res, next) => {
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
}


module.exports = {
    getProductsController,
    getProductController,
    postProductController,
    deleteProductController,
    putProductController
}