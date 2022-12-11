import { passport } from "../config/localStrategy.js";


export const serializer = () => {
    passport.serializeUser((user, done) => {
        done(null,user.id)
    })
}