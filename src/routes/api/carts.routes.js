const { Router } = require('express');
const { deleteProduct, getProduct } = require('../../utils/productValidate');
const { checkSession } = require('../../middleware/auth');
const { getCartsController, getCartController, postCartController, postAddProductToCartController, postBuyItemsController, deleteCartController, deleteProductToCartController } = require('../../controllers/carts.controller');


const cartsRoute = Router(); 

// GET
cartsRoute.get('/', checkSession, getCartsController);

cartsRoute.get('/:cartId', checkSession, getProduct , getCartController);

// POST
cartsRoute.post('/', checkSession , postCartController);

cartsRoute.post('/:cartId', checkSession, postAddProductToCartController);

cartsRoute.post('/buy/:cartId', checkSession, postBuyItemsController);

// DELETE
cartsRoute.delete('/:cartId', checkSession, deleteProduct, deleteCartController);

cartsRoute.delete('/:cartId/productos/:productId', checkSession, deleteProduct, deleteProductToCartController);

module.exports = cartsRoute