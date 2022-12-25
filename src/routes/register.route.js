const { Router } = require('express')
const passport = require('../config/localStrategy')
const registerRouter = Router()

registerRouter.get("/",(req, res) => {
    res.render("register")
})

registerRouter.get("/error", (req, res) => {
    res.render("errorRegister")
})

registerRouter.post("/",  passport.authenticate("signupStrategy",{
    failureRedirect: '/api/register/error',
    failureMessage: true
}),(req, res) => {
    res.redirect("/api/home")
})


module.exports = registerRouter