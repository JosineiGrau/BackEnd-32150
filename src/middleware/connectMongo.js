import session from "express-session";
import MongoStore from "connect-mongo"; 

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true}
 
export const MongoAtlas = session({
    store: MongoStore.create({ mongoUrl: `mongodb+srv://josinei:Lilgrau1566@coderhouse.xjsf45t.mongodb.net/?retryWrites=true&w=majority`, mongoOptions: advancedOptions }),

    secret: 'coder',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000000}
})