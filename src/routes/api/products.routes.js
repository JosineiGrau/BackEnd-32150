const { Router } = require('express');
const { deleteProduct, getProduct, updateProduct, validationCreate } = require('../../utils/productValidate');
const { checkSession, checkRol } = require('../../middleware/auth');
const { getProductController, getProductsController, postProductController, deleteProductController, putProductController } = require('../../controllers/products.controller');


const productsRoute = Router(); 

// GET
productsRoute.get('/', checkSession, getProductsController);

productsRoute.get('/:productId', checkSession, getProduct, getProductController);

productsRoute.post('/', checkRol, checkSession, validationCreate, postProductController)

// DELETE
productsRoute.delete('/:productId', deleteProduct, checkRol, checkSession, deleteProductController);

// PUT
productsRoute.put('/:productId', checkRol, checkSession, updateProduct , putProductController);

module.exports = productsRoute;