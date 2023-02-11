const dotenv = require('dotenv')
const args = require("../utils/parseArgs")
dotenv.config()

const config = {
    admin : true,
    server: {
        PORT: args.port || process.env.PORT,
        mode: args.mode,
        env: args.mode,
        dbType: args.dataBase || process.env.DB_TYPE
    },
    mongoDB: {
        mongoUrl: process.env.DB_MONGO_URL
    }
}

module.exports = config
