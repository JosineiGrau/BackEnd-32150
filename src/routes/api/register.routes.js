const { Router } = require('express')
const passport = require('../../helpers/localStrategy')
const registerRouter = Router()

registerRouter.get("/",(req, res) => {
    res.render("register")
})

registerRouter.get("/error", (req, res) => {
    res.render("errorRegister")
})

registerRouter.post("/",  passport.authenticate("signupStrategy",{
    failureRedirect: '/register/error',
    failureMessage: true
}),(req, res) => {
    res.redirect("/home")
})


module.exports = registerRouter