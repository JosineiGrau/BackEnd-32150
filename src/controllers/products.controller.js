const success = require('../networks/responses');
const ProductsFS = require('../services/daos/productFS.daos')
const productsFS = new ProductsFS()


const getProductsController = async (req, res, next) => {
    try {
		const allProducts = await productsFS.getAll();
		success(res,200,'Estos son todos los productos',allProducts)
	} catch (err) {
		next(err)
	}
}

const getProductController = async (req, res, next) => {
    try {
		const { productId } = req.params;
		const productById = await productsFS.getById(productId);

		success(res,200,'El producto Obtenido',productById)

	} catch (err) {
		next(err);
	}
}

const getViewProductsController = async (req, res, next) => {
    try {
		const allProducts = await productsFS.getAll()
		res.render('productos',{allProducts})
	} catch (error) {
		next(error)
	}
}

const postProductController = async (req, res, next) => {
    try {
		const newProduct = req.body;
		const getProducts = await productsFS.save(newProduct);

		success(res,201,'Producto Agregado',getProducts)
	} catch (err) {
		next(err)
	}
}

const deleteProductController = async (req, res, next) => {
    try {
		const { productId } = req.params;
		const deleteProduct = await productsFS.deleteById(productId);

		success(res,200,'Producto eliminado exitosamente',deleteProduct )	
		
	} catch (err) {
		next(err)
	}
}

const putProductController = async (req, res, next) => {
    try {
		const { productId } = req.params;
		const updateProduct = req.body;
		const updatedProduct = await productsFS.update(
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
    getViewProductsController,
    postProductController,
    deleteProductController,
    putProductController
}