import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { chatsRoot } from "../services/chats.service.js";

const chatsGraphqlSchema = buildSchema(`
    type Chat{
        id: Int,
        name: String,
        lastname: String,
        message: String,
        time_stamp: String,
    }

    input ChatInput{
        name: String,
        lastname: String,
        message: String,
    }

    type Query{
        getMessages: [Chat],
    }

    type Mutation{
        saveMessage(data: ChatInput): [Chat],
    }

`)

export const chatsGraphqlController = () => {
    return graphqlHTTP({
        schema: chatsGraphqlSchema,
        rootValue: chatsRoot,
        graphiql: true
    })
}

