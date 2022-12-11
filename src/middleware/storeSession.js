import session from "express-session";
import MongoStore from "connect-mongo"; 

// const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true}
const mongoUrl = 'mongodb+srv://josinei:Lilgrau1566@coderhouse.xjsf45t.mongodb.net/sessionsDB?retryWrites=true&w=majority'
 
export const StoreSession = session({
    store: MongoStore.create({ mongoUrl }),

    secret: 'claveSecreta',
    resave: false,
    saveUninitialized: false,
})