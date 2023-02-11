const { Router } = require('express')
const { getUsersController } = require('../../controllers/user.controller')
const { checkSession } = require('../../middleware/auth')

const userRoute = Router()

userRoute.get('/', checkSession, getUsersController)

module.exports = userRoute