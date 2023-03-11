import { Router } from "../../mods.ts"
import { deleteUserController, getAllUsersController, getUserController, saveUserController, updateUserController} from "../../controller/users.controller.ts"

export const usersRouter = new Router()

usersRouter.get('/', getAllUsersController)
usersRouter.get('/:id', getUserController)
usersRouter.post('/', saveUserController)
usersRouter.delete('/:id', deleteUserController)
usersRouter.put('/:id', updateUserController)
