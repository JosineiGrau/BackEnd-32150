import { Router } from "express";

import dotenv from 'dotenv'
import { success } from "../networks/responses.js";
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
    }
    success(res, 200, 'Datos obtenidos', info)
})


infoRoute.get('/vista', (req, res) => {
    const info = {
        argumentos: process.argv.slice(2),
        plataforma: process.platform,
        versionNode: process.version,
        memoriaReservada: process.memoryUsage().rss,
        path: process.argv.slice(0),
        idProceso: process.pid,
        carpetaDelProyecto: process.cwd(),
    }
    res.render('info', {info})
})
export {infoRoute}