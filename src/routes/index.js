import {Router} from 'express'

import { productsRoute } from './products.route.js'
import { cartsRoute } from './carts.route.js'
const router = Router()

export const apiRouter = (app) => {
  app.use('/api', router)
  router.use('/productos', productsRoute)
  router.use('/carrito', cartsRoute)

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