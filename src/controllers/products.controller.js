const success = require('../networks/responses');
const { saveProduct, deleteProductById, getAllProducts, getProductById, updateProduct } = require('../services/products.service');

const getProductsController = async (req, res, next) => {
    try {
		const allProducts = await getAllProducts();
		success(res,200,'Estos son todos los productos',allProducts)
	} catch (err) {
		next(err)
	}
}

const getProductController = async (req, res, next) => {
    try {
		const { productId } = req.params;
		const productById = await getProductById(productId);

		success(res,200,'El producto Obtenido',productById)

	} catch (err) {
		next(err);
	}
}

const getViewProductsController = async (req, res, next) => {
    try {
		const allProducts = await getAllProducts()
		res.render('productos',{allProducts})
	} catch (error) {
		next(error)
	}
}

const postProductController = async (req, res, next) => {
    try {
		const newProduct = req.body;
		const getProducts = await saveProduct(newProduct);

		success(res,201,'Producto Agregado',getProducts)
	} catch (err) {
		next(err)
	}
}

const deleteProductController = async (req, res, next) => {
    try {
		const { productId } = req.params;
		const deleteProduct = await deleteProductById(productId);

		success(res,200,'Producto eliminado exitosamente',deleteProduct )	
		
	} catch (err) {
		next(err)
	}
}

const putProductController = async (req, res, next) => {
    try {
		const { productId } = req.params;
		const dataProduct = req.body;
		const updatedProduct = await updateProduct(
			productId,
			dataProduct
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