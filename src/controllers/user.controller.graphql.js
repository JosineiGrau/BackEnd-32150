import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

import { usersRoot } from '../services/user.service.js'

const usersGraphqlSchema = buildSchema(`
    type User {
        _id: String,
        name: String,
        email: String,
        age: String,
    }

    input UserInput {
        _id: String,
        name: String,
        email: String,
        age: String,
    }

    type Query {
        getAllUsers: [User]
    }

`)

export const usersGraphqlController = () => {
    return graphqlHTTP({
        schema: usersGraphqlSchema,
        rootValue: usersRoot,
        graphiql: true,
    })
}
