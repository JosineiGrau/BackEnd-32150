export const infoRoot = {
    getInfo: () => {
        const info = {
            argumentos: process.argv.slice(2),
            plataforma: process.platform.toString(),
            versionNode: process.version,
            memoriaReservada: process.memoryUsage().rss,
            path: process.argv.slice(0),
            idProceso: process.pid,
            carpetaDelProyecto: process.cwd(),
        }
        return info
    }
}