import { Router } from 'express'
import { logger } from '../config/loggerConfig.js'
import { chatsRoute } from './api/chats.routes.js'
import { homeRoute } from './api/home.routes.js'
import { infoRoute } from './api/info.routes.js'
import { loginRoute } from './api/login.routes.js'
import { logoutRoute } from './api/logout.routes.js'
import { productsRoute } from './api/products.routes.js'
import { randomsRoute } from './api/randoms.routes.js'
import { registerRouter } from './api/register.routes.js'
import { userRoute } from './api/user.routes.js'

const router = Router()

export const apiRouter = (app) => {
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

