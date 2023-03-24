import { param } from "express-validator";
import config from "../config/config.js";
import { validarCampos } from "./validateData.utility.js";

export let cartIdValidate = [];

if (config.server.dbType === 'MONGO') {
	cartIdValidate = [
		param('cartId').isMongoId().withMessage('Id no es valido'),
		(req, res, next) => {
			validarCampos(req, res, next);
		},
	];
}