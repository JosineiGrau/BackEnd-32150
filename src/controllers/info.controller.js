import os from 'os'
import success from '../networks/responses.js'


export const getInfoController = (req, res) => {
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

export const getViewInfoController = (req, res) => {
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
