import passport from '../helpers/localStrategy.js'
import { UserModel } from '../persistence/models/users.js';

const deserialize = () => {
    passport.deserializeUser((id, done) => {
        // validar si el usuario existe en la base de datos
        UserModel.findById(id, (err, userFound) => {
            if(err) return done(err);
            return done(null, userFound)
        })
    })
}

export default deserialize