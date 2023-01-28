const { transporter, mailOptions, emailTemplateCheckout } = require("../config/nodemailer.config");
const client = require("../config/twilio.config");
const success = require("../networks/responses");
const Carts = require('../services/daos/carts/cartsMongo.daos');

const db = new Carts()

const getCartsController = async (req, res, next) => {
    try {
		const allCarts = await db.getAll();
        success(res,200,'Estos son todos los carritos',allCarts)
	} catch (err) {
		next(err)
	}
}

const getCartController = async (req, res, next) => {
    try {
		const { cartId } = req.params;
		const cartById = await db.getById(cartId);
        success(res,200, 'El carrito Obtenido',cartById)
	} catch (err) {
		next(err);
	}
}

const postCartController = async (req, res, next) => {
    try {
		const newCart = await db.save()
        success(res,201, 'Nuevo carrito añadido',newCart)
	} catch (err) {
		next(err)
	}
}

const postAddProductToCartController = async (req, res, next) => {
    try {
		const { cartId } = req.params;
		const newProduct = req.body;
		const cartById = await db.addProduct(cartId ,newProduct);
        success(res,201, 'Producto Agregado',cartById)

	} catch (err) {
		next(err)
	}
}

const postBuyItemsController = async (req, res, next) => {
    try {
		const { name, email } = req.user
		const { cartId } = req.params;
		const cartById = await db.getById(cartId);

		// GMAIL
		await transporter.sendMail(mailOptions(emailTemplateCheckout(cartById[0].products), `Nuevo pedido de ${name}, ${email}`))

		// SMS
		await client.messages.create({
			body: `Hola ${name}, su pedido ha sido recibido y se encuentra en proceso}`,
			from: "+17122144461",
			to: "+51940471501"
		})

		// WhatsApp
		cartById[0].products.forEach(async (element) => {
			await client.messages.create({
			mediaUrl: element.image,
			body: `Hola ${name}, su pedido ha sido recibido y se encuentra en proceso}`,
			from: "whatsapp:+14155238886",
			to: "whatsapp:+51977944283"
		})
		});
		
		success(res, 202, 'Compra realizada')

	} catch (err) {
		next(err)
	}
}

const deleteCartController = async (req, res, next) => {
    try {
		const { cartId } = req.params;
		const cartById = await db.deleteById(cartId);
        success(res,200, 'Carrito eliminado exitosamente',cartById.id)
	} catch (err) {
		next(err)
	}
}

const deleteProductToCartController = async (req, res, next) => {
    try {
		const { cartId, productId } = req.params;
		const product = await db.deleteProduct(cartId, productId);
        success(res,200, 'Producto eliminado exitosamente del carrito',product.id)
	} catch (err) {
		next(err)
	}
}


module.exports = {
    getCartsController,
    getCartController,
    postCartController,
    postAddProductToCartController,
    postBuyItemsController,
    deleteCartController,
    deleteProductToCartController
}