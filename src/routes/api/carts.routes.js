import { Router } from 'express';
import {
	addProductToCartController,
	deleteCartController,
	deleteProductToCartController,
	getCartController,
	getCartsController,
	postCartController,
} from '../../controllers/carts.controller.js';
import { checkSession, verifyUserRol } from '../../middleware/auth.js';
import { cartIdValidate } from '../../utils/cartValidate.utility.js';

const cartsRoute = Router();

// GET
cartsRoute.get('/', checkSession, getCartsController);

cartsRoute.get('/:cartId', checkSession, cartIdValidate, getCartController);

// POST
cartsRoute.post('/', checkSession, verifyUserRol, postCartController);
cartsRoute.post('/:cartId/product/:productId', checkSession, cartIdValidate, verifyUserRol, addProductToCartController);

// DELETE
cartsRoute.delete('/:cartId', checkSession, cartIdValidate, verifyUserRol, deleteCartController);
cartsRoute.delete('/:cartId/product/:productId', checkSession, cartIdValidate, verifyUserRol, deleteProductToCartController);

export { cartsRoute };
