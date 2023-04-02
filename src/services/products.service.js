import { getApiDao } from '../persistence/index.js';
import config from '../config/config.js';
import error from '../utils/setError.js';
import { convertToProductDto } from '../dtos/product.dto.js';

const { ProductsDaoContainer } = await getApiDao(config.server.dbType);

export const saveProduct = async (product) => {
	const newProduct = await ProductsDaoContainer.save(product);
	return convertToProductDto(newProduct);
};

export const getProductById = async (id) => {
    const productId = await ProductsDaoContainer.getById(id);
	if (!productId)
		throw error('product not found', 404);
	return convertToProductDto(productId);
};

export const getAllProducts = async () => {
	const allProducts = await ProductsDaoContainer.getAll();
	return convertToProductDto(allProducts);
};

export const deleteProductById = async (id) => {
	await getProductById(id);
	await ProductsDaoContainer.deleteById(id);
};

export const updateProduct = async (id, body) => {
	await getProductById(id);
	const updatedProduct = await ProductsDaoContainer.update(id, body);
	return convertToProductDto(updatedProduct);
};
