import { Router } from 'express';
import {
	getProductController,
	deleteProductController,
	getProductsController,
	postProductController,
	putProductController,
} from '../../controllers/products.controller.js';
import { checkSession, verifyUserRol } from '../../middleware/auth.js';
import {
	createProduct,
	productIdValidate,
	updateProduct,
} from '../../utils/productValidate.utility.js';

const productsRoute = Router();

// GET
productsRoute.get('/', checkSession, getProductsController);

productsRoute.get(
	'/:productId',
	checkSession,
	productIdValidate,
	getProductController
);

// POST
productsRoute.post(
	'/',
	checkSession,
	verifyUserRol,
	createProduct,
	postProductController
);

// DELETE
productsRoute.delete(
	'/:productId',
	checkSession,
	verifyUserRol,
	productIdValidate,
	deleteProductController
);

// PUT
productsRoute.put(
	'/:productId',
	checkSession,
	verifyUserRol,
	productIdValidate,
	updateProduct,
	putProductController
);

export { productsRoute };
