import passport from 'passport'
import { Strategy } from 'passport-local'
import { UserModel } from '../persistence/models/users.js'
import encryptPassword from '../utils/encryptPassword.js'
import matchPassword from '../utils/matchPassword.js'

passport.use('loginStrategy',new Strategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    }, 
    (email, password, done) => {
        UserModel.findOne({ email }, async (err, userFound) => {
        if (err) return done(err, null, {message: 'Hubo un error'})
        if (!userFound) return done(null, null, {message: 'El usuario no existe'})
        if (await matchPassword(password, userFound.password)){
            return done(null, userFound);
        } else {
            return done(err, null, {message: 'Contraseña incorrecta'})
        }
      });
    }
  ));

passport.use('signupStrategy', new Strategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    }, 
    (req, email, password, done) => {
        UserModel.findOne({email}, async (err, userFound) => {
            if(err) return done(err, null, {message: 'Hubo un error'})
            if(userFound) return done(null, null, {message: 'El usuario ya existe'})
            const newUser = {
                name: req.body.name,
                email,
                password: await encryptPassword(password),
                direction: req.body.direction,
                phone: req.body.phone,
                age: req.body.age,
                photo: req.body.photo
            }
            console.log(newUser)
            UserModel.create(newUser,(err, userCreate) => {
                if(err) return done(err, null, {message: 'Hubo un error al registrar al usuario'})
                return done(null, userCreate)
            })
        })
    }
)) 

export default passport