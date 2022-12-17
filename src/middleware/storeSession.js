import session from "express-session";
import MongoStore from "connect-mongo"; 
import dotenv from 'dotenv'
// const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true}
 
dotenv.config()

export const StoreSession = session({
    store: MongoStore.create({ mongoUrl: process.env.DB_MONGO_url }),

    secret: 'claveSecreta',
    resave: false,
    saveUninitialized: false,
})