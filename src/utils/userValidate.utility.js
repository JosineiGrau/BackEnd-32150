import { check } from 'express-validator';
import { validarCampos } from './validateData.utility.js';

export const validationRegisterUser = [
	check('name', 'Name is required').exists().not().isEmpty(),

	check('email')
		.exists()
		.not()
		.isEmpty()
		.withMessage('email is required')
		.isEmail()
		.withMessage('email invalid'),

	check('password')
		.exists()
		.not()
		.isEmpty()
		.withMessage('password is required')
		.isString()
		.withMessage('password value string'),

	check('direction')
		.exists()
		.not()
		.isEmpty()
		.withMessage('direction is required')
		.isString()
		.withMessage('direction value string'),

	check('phone')
		.exists()
		.not()
		.isEmpty()
		.withMessage('phone is required')
		.isString()
		.withMessage('phone value string'),

	check('age')
		.exists()
		.not()
		.isEmpty()
		.withMessage('age is required')
		.not()
		.isString()
		.withMessage('Age value numeric'),

	check('photo')
		.exists()
		.not()
		.isEmpty()
		.withMessage('photo is required')
		.isURL()
		.withMessage('photo is URL'),

	check('rol').exists().not().isEmpty().withMessage('rol is required'),

	(req, res, next) => {
		validarCampos(req, res, next);
	},
];

export const validationLoginUser = [
	check('email')
		.exists()
		.not()
		.isEmpty()
		.withMessage('email is required')
		.isEmail()
		.withMessage('email invalid'),

	check('password')
		.exists()
		.not()
		.isEmpty()
		.withMessage('password is required')
		.isString()
		.withMessage('password value string'),

	(req, res, next) => {
		validarCampos(req, res, next);
	},
];
