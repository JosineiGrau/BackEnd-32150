import { Router } from 'express'
import passport from '../../helpers/localStrategy.js'
import { verifyLogin } from '../../middleware/auth.js'
import success from '../../networks/responses.js'
import error from '../../utils/setError.js'

const loginRoute = Router()

loginRoute.get('/error', (req, res) => {
    const message = req.session.messages.pop()
    throw error(message, 404)
})

loginRoute.post('/', verifyLogin, passport.authenticate('loginStrategy', {
    failureRedirect: '/login/error',
    failureMessage: true,
}),async (req,res) => {
    success(res, 200, 'Usuario logueado')
})

export  {loginRoute}