import { Router } from 'express';
import passport from '../../helpers/localStrategy.js';
import { verifyLogin } from '../../middleware/auth.js';
import success from '../../networks/responses.js';
import error from '../../utils/setError.js';
import { validationLoginUser } from '../../utils/userValidate.utility.js';

const loginRoute = Router();

loginRoute.get('/error', (req, res) => {
	const message = req.session.messages.pop();
	throw error(message, 404);
});

loginRoute.post(
	'/',
	verifyLogin,
	validationLoginUser,
	passport.authenticate('loginStrategy', {
		failureRedirect: '/login/error',
		failureMessage: true,
	}),
	async (req, res) => {
		const { _id, name, email, direction, phone, age, photo, rol } = req.user;
		success(res, 200, 'Usuario logueado', {
			_id,
			name,
			email,
			direction,
			phone,
			age,
			photo,
			rol,
		});
	}
);

export { loginRoute };
