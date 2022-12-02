import { Router } from "express";
import { auth } from '../middleware/auth.js';

const authRoute = Router()

authRoute.get('/', (req, res) => {
    res.render('login')
})

authRoute.get('/logout', auth,(req, res, next) => {
    if(req.session.name) {
       const user = req.session.name
       req.session.destroy((err) => {
         if(err) {
            return res.json({err})
         }
         return res.render('logout', {name: user})
       })
   }
})

authRoute.post('/', (req,res) => {
    const { name } = req.body;
    if(!name) {
        res.redirect('/api/login')
    } else {
        req.session.name = name
        res.render('home', {
            name: req.session.name
        })
    }

})

export {authRoute}
