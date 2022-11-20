import { Router } from 'express'
import db from '../allDB/dataBaseOptionsProducts.js'
import { deleteProduct, getProduct, updateProduct, validationCreate } from '../utils/product.validate.js'
import { checkRol } from '../middleware/auth.js'
import { success } from '../networks/responses.js'

const productsRoute = Router(); 

// GET
productsRoute.get('/',async(req, res, next) => {
	try {
		const allProducts = await db.getAll();
		success(res,200,'Estos son todos los productos',allProducts)
	} catch (err) {
		next(err)
	}
});

productsRoute.get('/:productId', getProduct, async (req, res, next) => {
	try {
		const { productId } = req.params;
		const productById = await db.getById(productId);

		success(res,200,'El producto Obtenido',productById)

	} catch (err) {
		next(err);
	}
});

// POST
productsRoute.post('/', checkRol, validationCreate, async (req, res, next) => {
	try {
		const newProduct = req.body;
		const getProducts = await db.save(newProduct);

		success(res,201,'Producto Agregado',getProducts)
	} catch (err) {
		next(err)
	}
}); 


// DELETE
productsRoute.delete('/:productId', deleteProduct,checkRol, async (req, res, next) => {
	try {
		const { productId } = req.params;
		const deleteProduct = await db.deleteById(productId);

		success(res,200,'Producto eliminado exitosamente',deleteProduct )	
		
	} catch (err) {
		next(err)
	}
});

// PUT
productsRoute.put('/:productId',checkRol, updateProduct , async (req, res, next) => {
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

export {productsRoute}

