import { Router } from 'express';
import passport from '../../helpers/localStrategy.js';
import { verifyLogin } from '../../middleware/auth.js';
import success from '../../networks/responses.js';
import error from '../../utils/setError.js';
import { validationRegisterUser } from '../../utils/userValidate.utility.js';

const registerRouter = Router();

registerRouter.get('/error', (req, res, next) => {
	const message = req.session.messages.pop();
	throw error(message, 404);
});

registerRouter.post(
	'/',
	verifyLogin,
	validationRegisterUser,
	passport.authenticate('signupStrategy', {
		failureRedirect: '/register/error',
		failureMessage: true,
	}),
	async (req, res) => {
		success(res, 201, 'Usuario registrado');
	}
);

export { registerRouter };
