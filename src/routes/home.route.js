const { Router } = require('express')
const { checkSession } = require('../middleware/auth')

const homeRoute = Router()

homeRoute.get('/', checkSession,(req, res) => {
    res.render('home')
})

module.exports = homeRoute
