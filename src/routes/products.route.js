import { Router } from 'express'
import { Products } from '../services/product.class.js'
import { validateData } from '../utils/product.validate.js'
import { checkRol } from '../middleware/auth.js'
import { success } from '../networks/responses.js'
const productsList = new Products('productos');
const productsRoute = Router(); 

// GET
productsRoute.get('/',async(req, res, next) => {
	try {
		const allProducts = await productsList.getAll();
		success(res,200,'Estos son todos los productos',allProducts)
	} catch (err) {
		next(err)
	}
});

productsRoute.get('/:productId', async (req, res, next) => {
	try {
		const { productId } = req.params;
		const productById = await productsList.getById(parseInt(productId));

		success(res,200,'El producto Obtenido',productById)

	} catch (err) {
		next(err);
	}
});

// POST
productsRoute.post('/', checkRol, validateData, async (req, res, next) => {
	try {
		const newProduct = req.body;
		const getProducts = await productsList.save(newProduct);

		success(res,201,'Producto Agregado',getProducts)
	} catch (err) {
		next(err)
	}
}); 


// DELETE
productsRoute.delete('/:productId', checkRol, async (req, res, next) => {
	try {
		const { productId } = req.params;
		const products = await productsList.deleteById(parseInt(productId));

		success(res,200,'Producto eliminado exitosamente',products[0].id)	
		
	} catch (err) {
		next(err)
	}
});

// PUT
productsRoute.put('/:productId',checkRol , async (req, res, next) => {
	try {
		const { productId } = req.params;
		const updateProduct = req.body;
		const updatedProduct = await productsList.updateProduct(
			parseInt(productId),
			updateProduct
		);
		
		success(res,200,'Producto actualizado',updatedProduct)

	} catch (err) {
		next(err)
	}
});

export {productsRoute}

