const { Router } = require('express')
const passport = require('../../helpers/localStrategy')
const { verifyLogin } = require('../../middleware/auth')
const success = require('../../networks/responses')
const error = require('../../utils/setError')

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

module.exports = loginRoute