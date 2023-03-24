export const checkSession = (req, res, next) => {
	if (!req.isAuthenticated()) {
		res.status(401).json({
			error: true,
			msg: 'Debe iniciar sesión para continuar',
		});
	} else {
		next();
	}
};

export const verifyLogin = (req, res, next) => {
	if (req.isAuthenticated()) {
		res.status(200).json({
			error: false,
			msg: 'Usted ya se encuentra logueado',
		});
	} else {
		next();
	}
};

export const verifyUserRol = (req, res, next) => {
	if (req.user.rol === 'user') {
		res.status(400).json({
			error: true,
			msg: 'Usted no puede hacer estas acciones por que no es el administrador',
		});
	} else {
		next();
	}
};
