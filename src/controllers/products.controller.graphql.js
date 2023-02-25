import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { productsRoot } from "../services/products.service.js";

const productsGraphqlSchema = buildSchema(`
    type Product{
        id: Int,
        name: String,
        price: Int,
        image: String,
    }

    input ProductInput{
        name: String,
        price: Int,
        image: String,
    }

    type Query{
        getAllProducts: [Product],
        getProductById(id: String): Product,
    }

    type Mutation{
        saveProduct(product: ProductInput): [Product],
        updateProduct(id: String, body: ProductInput): Product,
        deleteProductById(id: String): Product
    }

`)

export const productsGraphqlController = () => {
    return graphqlHTTP({
        schema: productsGraphqlSchema,
        rootValue: productsRoot,
        graphiql: true
    })
}