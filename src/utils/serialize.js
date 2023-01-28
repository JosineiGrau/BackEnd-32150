const passport = require('../helpers/localStrategy');


const serializer = () => {
    passport.serializeUser((user, done) => {
        done(null,user.id)
    })
}

module.exports = serializer