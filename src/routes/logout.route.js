import { Router } from "express";
import { checkSession } from "../middleware/auth.js";

const logoutRoute = Router()

logoutRoute.get('/', checkSession,(req, res, next) => {
   req.logOut(err => {
      if(err) return res.send("hubo un error al cerrar sesión")
      req.session.destroy()
      res.redirect("/api/login")
   });
  
})

export {logoutRoute}