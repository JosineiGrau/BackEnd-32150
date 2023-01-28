const config = require('../config/config')
// const { validateSignature } = require('../utils/auth')
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
        res.status(401).json({
            error: true,
            msg: 'Debe iniciar sesión para continuar'
        })
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

// const authenticate = (req, res, next) => {
//     const isJsonWenToken = validateSignature(req)
//     if (isJsonWenToken instanceof Object) {
//         next()
//     } else if (isJsonWenToken) {
//         res.status(500).send('Token expired')
//     } else {
//         res.status(500).send('Token invalid')
//     }
// }


module.exports = {
   checkSession,
   checkRol,
//    authenticate,
   verifyLogin
}