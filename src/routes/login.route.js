const { Router } = require('express')
const passport = require('../config/localStrategy')

const loginRoute = Router()

loginRoute.get('/', (req, res) => {
    console.log(req.session)

    res.render('login')
})

loginRoute.get('/error', (req, res) => {
    res.render('errorLogin')
})

loginRoute.post('/', passport.authenticate('loginStrategy', {
    failureRedirect: '/api/login/error',
    failureMessage: true,
}),(req,res) => {
    console.log(req.body)
    res.redirect('/api/home')
})

module.exports = loginRoute