import { getApiDao } from '../persistence/index.js';
import config from '../config/config.js';
import error from '../utils/setError.js';
import { getProductById } from './products.service.js';
import { convertToCartDto } from '../dtos/cart.dto.js';

const { CartsDaoContainer } = await getApiDao(config.server.dbType);

export const getAllCarts = async () => {
	const allCarts = await CartsDaoContainer.getAll();
	return convertToCartDto(allCarts);
};

export const getCartById = async (id) => {
	const cartById = await CartsDaoContainer.getById(id);
    if (!cartById || cartById.length === 0)
		throw error('cart not found', 404);
     return convertToCartDto(cartById);
};

export const saveCart = async () => {
	const newCart = await CartsDaoContainer.saveCart();
	return convertToCartDto(newCart);
};

export const deleteCartById = async (id) => {
    await getCartById(id)
	await CartsDaoContainer.deleteById(id);
};

export const addProductToCart = async (cartId, productId) => {
    await getCartById(cartId)
    const productById = await getProductById(productId)

	const newProduct = await CartsDaoContainer.addProductToCart(cartId, productById);
    console.log(newProduct)
	return convertToCartDto(newProduct);
};

export const deleteProductToCart = async (cartId, productId) => {
    const cartById = await getCartById(cartId)
    const productById = await getProductById(productId)

    const res = await CartsDaoContainer.deleteProductToCart(cartById, productById);

    if (!res) throw error('the product is not in the cart', 400);
};
