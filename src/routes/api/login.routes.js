const { Router } = require('express')
const passport = require('../../helpers/localStrategy')

const loginRoute = Router()

loginRoute.get('/', (req, res) => {
    res.render('login')
})

loginRoute.get('/error', (req, res) => {
    res.render('errorLogin')
})

loginRoute.post('/', passport.authenticate('loginStrategy', {
    failureRedirect: '/login/error',
    failureMessage: true,
}),(req,res) => {
    console.log(req.body)
    res.redirect('/home')
})

module.exports = loginRoute