import passport from "../helpers/localStrategy.js"

const serializer = () => {
    passport.serializeUser((user, done) => {
        done(null,user.id)
    })
}

export default serializer