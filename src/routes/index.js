import { Router } from 'express';
import { logger } from '../config/loggerConfig.js';
import { cartsRoute } from './api/carts.routes.js';
import { loginRoute } from './api/login.routes.js';
import { logoutRoute } from './api/logout.routes.js';
import { productsRoute } from './api/products.routes.js';
import { registerRouter } from './api/register.routes.js';

const router = Router();

export const apiRouter = (app) => {
	app.use('/', router);
	router.use('/products', productsRoute);
	router.use('/carts', cartsRoute);
	router.use('/login', loginRoute);
	router.use('/register', registerRouter);
	router.use('/logout', logoutRoute);

	app.use('*', async (req, res, next) => {
		res.status(400).json({
			error: -2,
			description: {
				route: req.baseUrl,
				method: req.method,
				msg: 'not implemented',
			},
		});
		logger.warn(`${req.baseUrl} not found`);
	});
};
