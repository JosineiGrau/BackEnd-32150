import { Router } from 'express'
import dotenv from 'dotenv'
import compression from 'compression'
import { getInfoController, getViewInfoController } from '../../controllers/info.controller.js'

dotenv.config()

const infoRoute = Router()

infoRoute.get('/', getInfoController)


infoRoute.get('/view', compression() , getViewInfoController)

infoRoute.get('/api', (req, res) => {
	res.send(`Respuesta desde PID ${process.pid}`)
})

export {infoRoute}