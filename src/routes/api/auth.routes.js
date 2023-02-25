import { Router } from 'express'
import success from '../../networks/responses.js'
import { verifyLogin, checkSession } from '../../middleware/auth.js'
import passport from '../../helpers/localStrategy.js'
import error from '../../utils/setError.js'

const authRouter = Router()

authRouter.get("/error", (req, res, next) => {
    const message = req.session.messages.pop()
    throw error(message, 404)
})


authRouter.post("/login", verifyLogin, passport.authenticate('loginStrategy', {
    failureRedirect: '/auth/error',
    failureMessage: true
}), (req, res) => {
    success(res, 200, 'Usuario Logueado')
})

authRouter.post("/register",  verifyLogin, passport.authenticate("signupStrategy",{
    failureRedirect: '/auth/error',
    failureMessage: true
}), async (req, res) => {
    success(res, 201, 'Usuario registrado')
})


authRouter.get('/logout', checkSession, (req, res, next) => {
    const { name } = req.user
    req.logOut(err => {
       if(err) return res.send("hubo un error al cerrar sesión")
       req.session.destroy()
       success(res, 200, `Hasta luego ${name} nos vemos pronto`)
    });
 
 })
export { authRouter }