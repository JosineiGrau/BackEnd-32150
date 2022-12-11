import {passport } from "../config/localStrategy.js";
import { UserModel } from "../models/users.js";

export const deserialize = () => {
    passport.deserializeUser((id, done) => {
        // validar si el usuario existe en la base de datos
        UserModel.findById(id, (err, userFound) => {
            if(err) return done(err);
            return done(null, userFound)
        })
    })
}