import session from 'express-session'; 
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';

dotenv.config()

export const StoreSession = session({
    store: MongoStore.create({ mongoUrl: process.env.DB_MONGO_url }),

    secret: 'claveSecreta',
    resave: false,
    saveUninitialized: false,
})
