const passport = require('../config/localStrategy');

const UserModel = require('../models/users');

const deserialize = () => {
    passport.deserializeUser((id, done) => {
        // validar si el usuario existe en la base de datos
        UserModel.findById(id, (err, userFound) => {
            if(err) return done(err);
            return done(null, userFound)
        })
    })
}

module.exports = deserialize