import { config } from '../config/config.js'
import error from '../utils/setError.js'

export const checkRol = (req, res, next) => {
    if (config.admin === true) {
        next()
    } else{
        throw error('No autorizado',401)
    }
}

export const auth = (req,res,next) => {
    if(!req.session?.name) {
        res.redirect('/api/login')
    } else {
        next()
    }
}