import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import { infoRoot } from '../services/info.service.js'


const infoGraphqlSchema = buildSchema(`
    type Info {
        argumentos: [String],
        plataforma: String,
        versionNode: String,
        memoriaReservada: Float,
        path: [String],
        idProceso: Int,
        carpetaDelProyecto: String,
    }
    input InfoInput {
        argumentos: [String],
        plataforma: String,
        versionNode: String,
        memoriaReservada: Float,
        path: [String],
        idProceso: Int,
        carpetaDelProyecto: String,
    }

    type Query{
        getInfo: Info
    }
`)

export const infoGraphqlController = () => {
    return graphqlHTTP({
        schema: infoGraphqlSchema,
        rootValue: infoRoot,
        graphiql: true
    })
}

