import { check, param } from 'express-validator';
import config from '../config/config.js';
import error from './setError.js';
import { validarCampos } from './validateData.utility.js';

export let productIdValidate = [];

if (config.server.dbType === 'MONGO') {
	productIdValidate = [
		param('productId').isMongoId().withMessage('Id no es valido'),
		(req, res, next) => {
			validarCampos(req, res, next);
		},
	];
}

export const createProduct = [
	check('name').exists().not().isEmpty().withMessage('Name is required'),

	check('description')
		.exists()
		.not()
		.isEmpty()
		.withMessage('Description is required'),

	check('code')
		.exists()
		.not()
		.isEmpty()
		.withMessage('Code is required')
		.not()
		.isString()
		.withMessage('Code value numeric'),

	check('image')
		.exists()
		.not()
		.isEmpty()
		.withMessage('Image is required')
		.isURL()
		.withMessage('Image is URL'),

	check('price')
		.exists()
		.not()
		.isEmpty()
		.withMessage('Price is required')
		.not()
		.isString()
		.custom((value, { req }) => {
			if (value < 10 || value > 150000) {
				throw error('Price value numeric between 10 and 150000', 400);
			}
			return true;
		}),

	check('stock')
		.exists()
		.not()
		.isEmpty()
		.withMessage('Stock is required')
		.not()
		.isString()
		.custom((value, { req }) => {
			if (value > 10000) {
				throw error('Stock value numeric max 10000', 400);
			}
			return true;
		}),

	(req, res, next) => {
		validarCampos(req, res, next);
	},
];

export const updateProduct = [
	check('name', 'Name is required').escape().optional(),

	check('description', 'Description is required').escape().optional(),

	check('code', 'Code is required').escape().optional(),

	check('image', 'Image is URL').isURL().optional(),

	check('price')
		.not()
		.isString()
		.custom((value, { req }) => {
			if (value > 10000) {
				throw error('Stock value numeric max 10000', 400);
			}
			return true;
		})
		.optional(),

	check('stock')
		.not()
		.isString()
		.custom((value, { req }) => {
			if (value < 10 || value > 150000) {
				throw error('Price value numeric between 10 and 150000', 400);
			}
			return true;
		})
		.optional(),

	(req, res, next) => {
		validarCampos(req, res, next);
	},
];
