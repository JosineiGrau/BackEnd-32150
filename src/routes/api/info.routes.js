const { Router } = require('express')
const dotenv = require('dotenv')
const compression = require('compression')
const { getInfoController, getViewInfoController } = require('../../controllers/info.controller')

dotenv.config()

const infoRoute = Router()

infoRoute.get('/', getInfoController)


infoRoute.get('/view', compression() , getViewInfoController)

infoRoute.get('/api', (req, res) => {
	res.send(`Respuesta desde PID ${process.pid}`)
})

module.exports = infoRoute