import { Router } from 'express'
import { logger } from '../config/loggerConfig.js'
import { chatsGraphqlController } from '../controllers/chats.controller.graphql.js'
import { infoGraphqlController } from '../controllers/info.controller.graphql.js'
import { productsGraphqlController } from '../controllers/products.controller.graphql.js'
import { usersGraphqlController } from '../controllers/user.controller.graphql.js'
// import { loginRoute } from './api/login.routes.js'
// import { logoutRoute } from './api/logout.routes.js'
// import { registerRouter } from './api/register.routes.js'
// import { userRoute } from './api/user.routes.js'

const router = Router()

export const apiRouter = (app) => {
    app.use('/', router)
    router.use('/info', infoGraphqlController())
    router.use('/productos', productsGraphqlController())
    router.use('/chats', chatsGraphqlController())
    router.use('/users', usersGraphqlController())
//   router.use('/login', loginRoute)
//   router.use('/register', registerRouter)
//   router.use('/logout', logoutRoute)

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

