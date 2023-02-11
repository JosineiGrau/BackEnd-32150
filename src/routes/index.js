const { Router } = require('express')
const chatsRoute = require('./api/chats.routes')
const homeRoute = require('./api/home.routes')
const infoRoute = require('./api/info.routes')
const loginRoute = require('./api/login.routes')
const registerRouter = require('./api/register.routes')
const logoutRoute = require('./api/logout.routes')
const productsRoute = require('./api/products.routes')
const randomsRoute = require('./api/randoms.routes')
const userRoute = require('./api/user.routes')
const { logger } = require('../config/loggerConfig')

const router = Router()

const apiRouter = (app) => {
  app.use('/', router)
  router.use('/productos', productsRoute)
  router.use('/chats', chatsRoute)
  router.use('/login', loginRoute)
  router.use('/register', registerRouter)
  router.use('/logout', logoutRoute)
  router.use('/home', homeRoute)
  router.use('/info', infoRoute)
  router.use('/randoms', randomsRoute)
  router.use('/users', userRoute)

  app.use('*', async (req, res, next) => {
    res.status(400).json({
      error: -2,
      description: {
        route: req.baseUrl,
        method: req.method,
        msg: 'not implemented'
      }
    })
    logger.warn(`${req.baseUrl} not found`)
  })
}

module.exports.apiRouter = apiRouter
