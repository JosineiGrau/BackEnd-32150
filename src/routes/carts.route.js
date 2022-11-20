import { Router } from 'express'
import db from '../allDB/dataBaseOptionsCarts.js';
import { deleteProduct, getProduct } from '../utils/product.validate.js'
import { checkRol } from '../middleware/auth.js';
import { success } from '../networks/responses.js'

const cartsRoute = Router(); 

// GET
cartsRoute.get('/', async (req, res, next) => {
	try {
		const allCarts = await db.getAll();
        success(res,200,'Estos son todos los carritos',allCarts)
	} catch (err) {
		next(err)
	}
});

cartsRoute.get('/:cartId', getProduct ,async (req, res, next) => {
	try {
		const { cartId } = req.params;
		const cartById = await db.getById(cartId);
        success(res,200, 'El carrito Obtenido',cartById)
	} catch (err) {
		next(err);
	}
});

// POST
cartsRoute.post('/', checkRol ,async (req, res, next) => {
	try {
		const newCart = await db.save()
        success(res,201, 'Nuevo carrito añadido',newCart)
	} catch (err) {
		next(err)
	}
});

cartsRoute.post('/:cartId/productos', checkRol, async (req, res, next) => {
	try {
		const { cartId } = req.params;
		const newProduct = req.body;
		const cartById = await db.addProduct(cartId ,newProduct);
        success(res,201, 'Producto Agregado',cartById)
		
	} catch (err) {
		next(err)
	}
});

// DELETE
cartsRoute.delete('/:cartId', checkRol, deleteProduct,async (req, res, next) => {
	try {
		const { cartId } = req.params;
		const cartById = await db.deleteById(cartId);
        success(res,200, 'Carrito eliminado exitosamente',cartById.id)
	} catch (err) {
		next(err)
	}
});

cartsRoute.delete('/:cartId/productos/:productId', checkRol, deleteProduct ,async (req, res, next) => {
	try {
		const { cartId, productId } = req.params;
		const product = await db.deleteProduct(cartId, productId);
        success(res,200, 'Producto eliminado exitosamente del carrito',product.id)
	} catch (err) {
		next(err)
	}
});

export {cartsRoute}