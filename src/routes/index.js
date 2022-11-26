import {Router} from 'express'
import { productsRoute } from './products.route.js'
import { chatsRoute } from './chats.route.js'
const router = Router()

export const apiRouter = (app) => {
  app.use('/api', router)
  router.use('/productos', productsRoute)
  router.use('/chats', chatsRoute)

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