import { Router } from 'express'
import { checkSession } from '../../middleware/auth.js'
import success from '../../networks/responses.js'

const logoutRoute = Router()

logoutRoute.get('/', checkSession,(req, res, next) => {
   const { name } = req.user
   req.logOut(err => {
      if(err) return res.send("hubo un error al cerrar sesión")
      req.session.destroy()
      success(res, 200, `Hasta luego ${name} nos vemos pronto`)
   });

})
export {logoutRoute}
