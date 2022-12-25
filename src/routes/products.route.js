const { Router } = require('express')
const { checkSession, checkRol } = require('../middleware/auth')
const success = require('../networks/responses')
const ProductsFS = require('../services/productos/productFS.class')


const productsFS = new ProductsFS()
const productsRoute = Router(); 

// GET
productsRoute.get('/', checkSession,async(req, res, next) => {
	try {
		const allProducts = await productsFS.getAll();
		success(res,200,'Estos son todos los productos',allProducts)
	} catch (err) {
		next(err)
	}
});

productsRoute.get('/:productId', checkSession, async (req, res, next) => {
	try {
		const { productId } = req.params;
		const productById = await productsFS.getById(productId);

		success(res,200,'El producto Obtenido',productById)

	} catch (err) {
		next(err);
	}
});

productsRoute.get('/coder/productos', checkSession, async (req,res,next) => {
	try {
		const allProducts = await productsFS.getAll()
		res.render('productos',{allProducts})
	} catch (error) {
		next(error)
	}
})
// POST
productsRoute.post('/', checkRol, checkSession, async (req, res, next) => {
	try {
		const newProduct = req.body;
		const getProducts = await productsFS.save(newProduct);

		success(res,201,'Producto Agregado',getProducts)
	} catch (err) {
		next(err)
	}
}); 


// DELETE
productsRoute.delete('/:productId' ,checkRol, checkSession, async (req, res, next) => {
	try {
		const { productId } = req.params;
		const deleteProduct = await productsFS.deleteById(productId);

		success(res,200,'Producto eliminado exitosamente',deleteProduct )	
		
	} catch (err) {
		next(err)
	}
});

// PUT
productsRoute.put('/:productId',checkRol , checkSession, async (req, res, next) => {
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
});

module.exports = productsRoute

