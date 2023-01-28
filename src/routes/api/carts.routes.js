const { Router } = require('express');
const { deleteProduct, getProduct } = require('../../utils/productValidate');
const { checkSession } = require('../../middleware/auth');
const success = require('../../networks/responses');
const Carts = require('../../services/daos/carts/cartsMongo.daos');
const { transporter, mailOptions, emailTemplateCheckout } = require('../../config/nodemailer.config');
const client = require('../../config/twilio.config');

const db = new Carts()

const cartsRoute = Router(); 

// GET
cartsRoute.get('/', async (req, res, next) => {
	try {
		const allCarts = await db.getAll();
        success(res,200,'Estos son todos los carritos',allCarts)
	} catch (err) {
		next(err)
	}
});

cartsRoute.get('/:cartId', getProduct ,async (req, res, next) => {
	try {
		const { cartId } = req.params;
		const cartById = await db.getById(cartId);
        success(res,200, 'El carrito Obtenido',cartById)
	} catch (err) {
		next(err);
	}
});

// POST
cartsRoute.post('/', checkSession ,async (req, res, next) => {
	try {
		const newCart = await db.save()
        success(res,201, 'Nuevo carrito añadido',newCart)
	} catch (err) {
		next(err)
	}
});

cartsRoute.post('/:cartId', checkSession, async (req, res, next) => {
	try {
		const { cartId } = req.params;
		const newProduct = req.body;
		const cartById = await db.addProduct(cartId ,newProduct);
        success(res,201, 'Producto Agregado',cartById)

	} catch (err) {
		next(err)
	}
});

cartsRoute.post('/checkout/:cartId', checkSession, async (req, res, next) => {
	try {
		const { name, email } = req.user
		const { cartId } = req.params;
		const cartById = await db.getById(cartId);

		await transporter.sendMail(mailOptions(emailTemplateCheckout(cartById[0].products), `Nuevo pedido de ${name}, ${email}`))
		// await client.messages.create({
		// 	body: `Hola ${name}, su pedido ha sido recibido y se encuentra en proceso}`,
		// 	from: "+17122144461",
		// 	to: "+51940471501"
		// })
		await client.messages.create({
			body: `Hola ${name}, su pedido ha sido recibido y se encuentra en proceso}`,
			from: "whatsapp: +14155238886",
			to: "whatsapp +51977944283"
		})
		success(res, 202, 'Compra realizada')

	} catch (err) {
		next(err)
	}
});

// DELETE
cartsRoute.delete('/:cartId', checkSession, deleteProduct,async (req, res, next) => {
	try {
		const { cartId } = req.params;
		const cartById = await db.deleteById(cartId);
        success(res,200, 'Carrito eliminado exitosamente',cartById.id)
	} catch (err) {
		next(err)
	}
});

cartsRoute.delete('/:cartId/productos/:productId', checkSession, deleteProduct ,async (req, res, next) => {
	try {
		const { cartId, productId } = req.params;
		const product = await db.deleteProduct(cartId, productId);
        success(res,200, 'Producto eliminado exitosamente del carrito',product.id)
	} catch (err) {
		next(err)
	}
});

module.exports = cartsRoute