import { Router } from 'express'
import { getUsersController } from '../../controllers/user.controller.js'
import { checkSession } from '../../middleware/auth.js'

const userRoute = Router()

userRoute.get('/', checkSession, getUsersController)

export { userRoute }