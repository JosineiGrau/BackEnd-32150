import success from '../networks/responses.js';
import {
	deleteCartById,
	getAllCarts,
	getCartById,
	saveCart,
	addProductToCart,
	deleteProductToCart,
} from '../services/carts.service.js';

export const getCartsController = async (req, res, next) => {
	try {
		const allCarts = await getAllCarts();
		success(res, 200, 'Estos son todos los Carritos', allCarts);
	} catch (err) {
		next(err);
	}
};

export const getCartController = async (req, res, next) => {
	try {
		const { cartId } = req.params;
		const cartById = await getCartById(cartId);
		success(res, 200, 'El carrito obtenido', cartById);
	} catch (err) {
		next(err);
	}
};

export const postCartController = async (req, res, next) => {
	try {
		const newCart = await saveCart();
		success(res, 201, 'Carrito creado', newCart);
	} catch (err) {
		next(err);
	}
};

export const deleteCartController = async (req, res, next) => {
	try {
		const { cartId } = req.params;
		await deleteCartById(cartId);
		success(res, 200, 'Carrito eliminado exitosamente');
	} catch (err) {
		next(err);
	}
};

export const addProductToCartController = async (req, res, next) => {
	try {
        const { cartId, productId } = req.params;
		const newProduct = await addProductToCart(cartId, productId);
		success(res, 200, 'Producto añadido al carrito exitosamente', newProduct);
	} catch (err) {
		next(err);
	}
};

export const deleteProductToCartController = async (req, res, next) => {
	try {
		const { cartId, productId } = req.params;

		await deleteProductToCart(cartId, productId);
		success(
			res,
			200,
			'Producto eliminado del carrito exitosamente',
		);
	} catch (err) {
		next(err);
	}
};
