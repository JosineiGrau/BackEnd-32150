const os = require('os')
const success = require("../networks/responses")

const getInfoController = (req, res) => {
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
}

const getViewInfoController = (req, res) => {
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
}


module.exports = {
    getInfoController,
    getViewInfoController
}