import { buildSchema } from "graphql"

// registerRouter.get("/error", (req, res, next) => {
//     const message = req.session.messages.pop()
//     throw error(message, 404)
// })

// registerRouter.post("/",  verifyLogin, passport.authenticate("signupStrategy",{
//     failureRedirect: '/register/error',
//     failureMessage: true
// }), async (req, res) => {
//     success(res, 201, 'Usuario registrado')
// })

const registerGraphqlSchema = buildSchema(`
    type Register {

    }

`)