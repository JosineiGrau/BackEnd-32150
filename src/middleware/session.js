import session from "express-session";

 
export const sessionLocal = session({
    secret: 'coder',
    resave: true,
    saveUninitialized: true,
})