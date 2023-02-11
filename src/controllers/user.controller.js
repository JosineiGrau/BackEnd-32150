const success = require("../networks/responses");
const { getAllUsers } = require("../services/user.service");


const getUsersController = async (req, res, next) => {
    try {
		const users = await getAllUsers();
		success(res,200,'Estos son todos los Usuarios', users)
	} catch (err) {
		next(err)
	}
}

module.exports = {
    getUsersController,
}