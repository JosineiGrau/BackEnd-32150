import { Router } from 'express'
import { getNumRandomsController, getNumRandomsNoBloqController } from '../../controllers/randoms.controller.js'

const randomsRoute = Router()

randomsRoute.get('/', getNumRandomsController)

randomsRoute.get('/no-bloqueante', getNumRandomsNoBloqController)


export { randomsRoute }