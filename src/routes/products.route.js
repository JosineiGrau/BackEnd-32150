import { Router } from 'express'
import { checkRol } from '../middleware/auth.js'
import { success } from '../networks/responses.js'
import { ProductsMock } from '../mocks/productsMock.js'
import { ProductsFS } from '../services/productos/productFS.class.js'

const productMock = new ProductsMock()
const productsFS = new ProductsFS()
const productsRoute = Router(); 

// GET
productsRoute.get('/',async(req, res, next) => {
	try {
		const allProducts = await productsFS.getAll();
		success(res,200,'Estos son todos los productos',allProducts)
	} catch (err) {
		next(err)
	}
});

productsRoute.get('/:productId', async (req, res, next) => {
	try {
		const { productId } = req.params;
		const productById = await productsFS.getById(productId);

		success(res,200,'El producto Obtenido',productById)

	} catch (err) {
		next(err);
	}
});

productsRoute.get('/coder/product-test', async (req,res,next) => {
	try {
		const newsProducts = await productMock.generate()
		res.render('productos-test',{newsProducts})
		// success(res,201, 'Productos creados', newsProducts)
	} catch (error) {
		next(error)
	}
})
productsRoute.get('/coder/productos', async (req,res,next) => {
	try {
		const allProducts = await productsFS.getAll()
		res.render('productos',{allProducts})
	} catch (error) {
		next(error)
	}
})
// POST
productsRoute.post('/', checkRol, async (req, res, next) => {
	try {
		const newProduct = req.body;
		const getProducts = await productsFS.save(newProduct);

		success(res,201,'Producto Agregado',getProducts)
	} catch (err) {
		next(err)
	}
}); 


// DELETE
productsRoute.delete('/:productId' ,checkRol, async (req, res, next) => {
	try {
		const { productId } = req.params;
		const deleteProduct = await productsFS.deleteById(productId);

		success(res,200,'Producto eliminado exitosamente',deleteProduct )	
		
	} catch (err) {
		next(err)
	}
});

// PUT
productsRoute.put('/:productId',checkRol , async (req, res, next) => {
	try {
		const { productId } = req.params;
		const updateProduct = req.body;
		const updatedProduct = await productsFS.update(
			productId,
			updateProduct
		);
		
		success(res,200,'Producto actualizado',updatedProduct)

	} catch (err) {
		next(err)
	}
});

export {productsRoute}

