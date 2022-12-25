const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv')
// const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true}
 
dotenv.config()

const StoreSession = session({
    store: MongoStore.create({ mongoUrl: process.env.DB_MONGO_url }),

    secret: 'claveSecreta',
    resave: false,
    saveUninitialized: false,
})

module.exports = StoreSession