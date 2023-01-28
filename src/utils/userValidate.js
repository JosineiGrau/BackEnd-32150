const { check } = require("express-validator")
const error = require("./setError")
const validarCampos = require("./validateData")

const validationRegisterUser = [
    check('name', 'Name is required').exists().not().isEmpty(),
    check('email', 'email is required').exists().not().isEmpty().isEmail(),
    check('email', 'email invalid').isEmail(),
    check('password', 'password is required').exists().not().isEmpty(),
    check('password', 'password value string').isString(),
    check('direction', 'direction is required').exists().not().isEmpty(),
    check('phone', 'phone is required').exists().not().isEmpty(),
    check('phone', 'phone value string').isString(),
    check('age', 'age is required').exists().not().isEmpty(),
    check('age').not().isString().custom((value, { req }) => {
        if(typeof value !== 'number') {
            throw error('Age value numeric', 400)
          }
        return true
    }),
    check('photo', 'photo is required').exists().not().isEmpty(),
    check('photo', 'photo is URL').isURL(),

    (req, res, next) => {
      validarCampos(req, res, next)
    }
]

const validationLoginUser = [
    check('email', 'email is required').exists().not().isEmpty().isEmail(),
    check('email', 'email invalid').isEmail(),
    check('password', 'password is required').exists().not().isEmpty(),
    check('password', 'password value string').isString(),

    (req, res, next) => {
      validarCampos(req, res, next)
    }
]

module.exports = {
    validationRegisterUser,
    validationLoginUser
}