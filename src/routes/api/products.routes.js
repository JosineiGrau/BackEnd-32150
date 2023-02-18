import { Router } from 'express';
import { getProductController, deleteProductController, getProductsController, getViewProductsController, postProductController, putProductController } from '../../controllers/products.controller.js';
import { checkRol } from '../../middleware/auth.js';

const productsRoute = Router(); 

// GET
productsRoute.get('/',  getProductsController);

productsRoute.get('/:productId',  getProductController);

productsRoute.get('/view',  getViewProductsController)
// POST
productsRoute.post('/', checkRol, postProductController); 


// DELETE
productsRoute.delete('/:productId' ,checkRol,  deleteProductController);

// PUT
productsRoute.put('/:productId',checkRol ,  putProductController);

export { productsRoute }

