const os = require('os')
const { Router } = require('express')
const dotenv = require('dotenv')
const success = require('../../networks/responses')
const compression = require('compression')

dotenv.config()

const infoRoute = Router()

infoRoute.get('/', (req, res) => {
    const info = {
        argumentos: process.argv.slice(2),
        plataforma: process.platform,
        versionNode: process.version,
        memoriaReservada: process.memoryUsage().rss,
        path: process.argv.slice(0),
        idProceso: process.pid,
        carpetaDelProyecto: process.cwd(),
        núcleos: os.cpus().length,
    }
    success(res, 200, 'Datos obtenidos', info)
})


infoRoute.get('/vista', compression() , (req, res) => {
    const info = {
        argumentos: process.argv.slice(2),
        plataforma: process.platform,
        versionNode: process.version,
        memoriaReservada: process.memoryUsage().rss,
        path: process.argv.slice(0),
        idProceso: process.pid,
        carpetaDelProyecto: process.cwd(),
        núcleos: os.cpus().length,
    }
    res.render('info', {info})
})

infoRoute.get('/api', (req, res) => {
	res.send(`Respuesta desde PID ${process.pid}`)
})

module.exports = infoRoute