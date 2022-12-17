import {Router} from 'express'
import { productsRoute } from './products.route.js'
import { chatsRoute } from './chats.route.js'
import { homeRoute } from './home.route.js'
import { loginRoute } from './login.route.js'
import { logoutRoute } from './logout.route.js'
import { registerRouter } from './register.route.js'
import { infoRoute } from './info.js'
import { randomsRoute } from './randoms.js'
const router = Router()

export const apiRouter = (app) => {
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