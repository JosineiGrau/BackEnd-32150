const { Router } = require('express')
const passport = require('../../helpers/localStrategy')
const { transporter, emailTemplateRegister, mailOptions } = require('../../config/nodemailer.config')
const { verifyLogin } = require('../../middleware/auth')
const success = require('../../networks/responses')
const error = require('../../utils/setError')
const registerRouter = Router()

registerRouter.get("/error", (req, res, next) => {
    const message = req.session.messages.pop()
    throw error(message, 404)
})

registerRouter.post("/",  verifyLogin, passport.authenticate("signupStrategy",{
    failureRedirect: '/register/error',
    failureMessage: true
}), async (req, res) => {
    const response = await transporter.sendMail(mailOptions(emailTemplateRegister(req.body), 'Nuevo registro'))
    success(res, 201, 'Usuario registrado', JSON.stringify(response))
})


module.exports = registerRouter