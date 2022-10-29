import { Router } from 'express'
import { Carts } from '../services/carts.class.js';
import { validateData } from '../utils/cart.validate.js'
const cartsList = new Carts('carts.json');
const cartsRoute = Router(); 

// GET
cartsRoute.get('/', async (req, res, next) => {
	try {
		const allCarts = await cartsList.getAll();
		if (allCarts) {
			res.status(200).json({
				error: false,
				message: 'Estos son todos los carritos',
				allCarts,
			});
		} else {
			res.status(404).json({
				error: true,
				message: 'No encontramos ningún carrito'
			});
		}
	} catch (err) {
		next(err)
	}
});

cartsRoute.get('/:cartId', async (req, res, next) => {
	try {
		const { cartId } = req.params;
		const cartById = await cartsList.getById(parseInt(cartId));
		if (cartById) {
			res.status(200).json({
				error: false,
				message: 'El carrito Obtenido',
				cartById,
			});
		} else {
			res.status(404).json({
				error: true,
				message: 'No encontramos ningún carrito'
			});
		}
	} catch (err) {
		next(err);
	}
});

// POST
cartsRoute.post('/', async (req, res, next) => {
	try {
		const newCart = await cartsList.save()
		res.status(201).json({
			error: false,
			message: 'Nuevo carrito añadido',
			cartId: newCart,
		});
	} catch (err) {
		next(err)
	}
});

cartsRoute.post('/:cartId/productos', validateData, async (req, res, next) => {
	try {
		const { cartId } = req.params;
		const newProduct = req.body;
		const cartById = await cartsList.addProduct(parseInt(cartId),newProduct);
		if (cartById) {
			res.status(201).json({
				error: false,
				message: 'Producto Agregado',
				cart: cartById,
			});
		} else {
			res.status(404).json({
				error: false,
				message: 'No existe el producto que desea agregar',
			});
		}
		
	} catch (err) {
		next(err)
	}
});

// DELETE
cartsRoute.delete('/:cartId', async (req, res, next) => {
	try {
		const { cartId } = req.params;
		const cartById = await cartsList.deleteById(parseInt(cartId));
		if (cartById) {
			res.status(200).json({
				error: false,
				message: 'Carrito eliminado exitosamente',
				deletedCartId: cartById.id,
			});
		} else {
			res.status(404).json({
				error: true,
				message: 'No existe el carrito que desea eliminar'
			});
		}
	} catch (err) {
		next(err)
	}
});

cartsRoute.delete('/:cartId/productos/:productId', async (req, res, next) => {
	try {
		const { cartId, productId } = req.params;
		const cartById = await cartsList.deleteProduct(parseInt(cartId), parseInt(productId));
		if (cartById) {
			res.status(200).json({
				error: false,
				message: 'Producto eliminado exitosamente del carrito',
				productRemovedFromCart: cartById.id,
			});
		} else {
			res.status(404).json({
				error: true,
				message: 'No existe el producto que desea eliminar del carrito'
			});
		}
	} catch (err) {
		next(err)
	}
});

export {cartsRoute}

