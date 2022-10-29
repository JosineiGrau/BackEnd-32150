import { Router } from 'express'
import { Products } from '../services/product.class.js'
import { validateDate } from '../utils/product.validate.js'
import { checkRol } from '../middleware/auth.js'

const productsList = new Products('products.json');
const productsRoute = Router(); 

// GET
productsRoute.get('/',async(req, res, next) => {
	try {
		const allProducts = await productsList.getAll();
		console.log(allProducts);
		if (allProducts) {
			res.status(200).json({
				error: false,
				message: 'Estos son todos los productos',
				allProducts,
			});
		} else {
			res.status(404).json({
				error: true,
				message: 'No encontramos ningún producto'
			});
		}
	} catch (err) {
		next(err)
	}
});

productsRoute.get('/:productId', async (req, res, next) => {
	try {
		const { productId } = req.params;
		const productById = await productsList.getById(parseInt(productId));
		if (productById) {
			res.status(200).json({
				error: false,
				message: 'El producto Obtenido',
				productById,
			});
		} else {
			res.status(404).json({
				error: true,
				message: 'No encontramos ningún producto'
			});
		}
	} catch (err) {
		next(err);
	}
});

// POST
productsRoute.post('/', checkRol, validateDate, async (req, res, next) => {
	try {
		const newProduct = req.body;
		const productById = await productsList.save(newProduct);
		res.status(201).json({
			error: false,
			message: 'Producto Agregado',
			newProduct: productById,
		});
	} catch (err) {
		next(err)
	}
});

// PUT
productsRoute.put('/:productId',checkRol , async (req, res, next) => {
	try {
		const { productId } = req.params;
		const updateProduct = req.body;
		const updatedProduct = await productsList.updateProduct(
			parseInt(productId),
			updateProduct
		);
		if (updatedProduct) {
			res.status(200).json({
				error:false,
				message: 'Producto actualizado',
				updatedProduct,
			});
		} else {
			res.status(404).json({
				error: true,
				message: 'No se puede actualizar el producto porque no existe'
			});
		}
	} catch (err) {
		next(err)
	}
});

// DELETE
productsRoute.delete('/:productId', checkRol, async (req, res, next) => {
	try {
		const { productId } = req.params;
		const productById = await productsList.deleteById(parseInt(productId));
		const products = await productsList.getAll()
		if (productById) {
			res.status(200).json({
				error: false,
				message: 'Producto eliminado exitosamente',
				deletedProductId: productById.id,
			});
		} else if (!products) {
			res.status(200).json({
				error: false,
				message: 'No se encontró ningún producto para borrar',
			});
		} else {
			res.status(404).json({
				error: true,
				message: 'No existe el producto que desea eliminar'
			});
		}
	} catch (err) {
		next(err)
	}
});

export {productsRoute}

