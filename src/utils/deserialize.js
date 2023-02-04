const passport = require('../helpers/localStrategy');

const UserModel = require('../persistence/models/users');

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