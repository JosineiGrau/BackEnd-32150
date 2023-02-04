const config = require('../config/config')
const error = require('../utils/setError')

const checkRol = (req, res, next) => {
    if (config.admin === true) {
        next()
    } else{
        throw error('No autorizado',401)
    }
}

const checkSession = (req,res,next) => {
    if(!req.isAuthenticated()) {
        res.redirect('/api/login')
    } else {
        next()
    }
}

const verifyLogin = (req, res, next) => {
    if(req.isAuthenticated()) {
        res.status(401).json({
            error: false,
            msg: 'Usted ya se encuentra logeado'
        })
    } else {
        next()
    }
}

module.exports = {
   checkSession,
   checkRol, 
   verifyLogin
}