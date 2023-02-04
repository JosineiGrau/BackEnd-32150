const { Router } = require('express')
const { checkSession } = require('../../middleware/auth')

const logoutRoute = Router()

logoutRoute.get('/', checkSession,(req, res, next) => {
   req.logOut(err => {
      if(err) return res.send("hubo un error al cerrar sesión")
      req.session.destroy()
      res.redirect("/login")
   });
  
})

module.exports = logoutRoute