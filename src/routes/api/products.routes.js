const { Router } = require('express')
const { getProductsController, getProductController, getViewProductsController, postProductController, deleteProductController, putProductController } = require('../../controllers/products.controller')
const { checkSession, checkRol } = require('../../middleware/auth')

const productsRoute = Router(); 

// GET
productsRoute.get('/', checkSession, getProductsController);

productsRoute.get('/:productId', checkSession, getProductController);

productsRoute.get('/view', checkSession, getViewProductsController)
// POST
productsRoute.post('/', checkRol, checkSession,postProductController); 


// DELETE
productsRoute.delete('/:productId' ,checkRol, checkSession, deleteProductController);

// PUT
productsRoute.put('/:productId',checkRol , checkSession, putProductController);

module.exports = productsRoute

