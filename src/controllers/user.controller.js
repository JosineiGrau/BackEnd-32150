import success from '../networks/responses.js'
import { getAllUsers } from "../services/user.service.js";


export const getUsersController = async (req, res, next) => {
    try {
		const users = await getAllUsers();
		success(res,200,'Estos son todos los Usuarios', users)
	} catch (err) {
		next(err)
	}
}
