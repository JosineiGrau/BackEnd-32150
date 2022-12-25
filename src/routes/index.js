const { Router } = require('express')
const chatsRoute = require('./chats.route')
const homeRoute = require('./home.route')
const infoRoute = require('./info')
const loginRoute = require('./login.route')
const registerRouter = require('./register.route')
const logoutRoute = require('./logout.route')
const productsRoute = require('./products.route')
const randomsRoute = require('./randoms')

const router = Router()

const apiRouter = (app) => {
  app.use('/api', router)
  router.use('/productos', productsRoute)
  router.use('/chats', chatsRoute)
  router.use('/login', loginRoute)
  router.use('/register', registerRouter)
  router.use('/logout', logoutRoute)
  router.use('/home', homeRoute)
  router.use('/info', infoRoute)
  router.use('/randoms', randomsRoute)

  app.use('*', async (req, res, next) => {
    res.status(400).json({
      error: -2,
      description: {
        route: req.baseUrl,
        method: req.method,
        msg: 'not implemented'
      }
    })
  })
}

module.exports.apiRouter = apiRouter
