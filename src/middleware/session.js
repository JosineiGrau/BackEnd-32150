const session = require('express-session');

const sessionLocal = session({
    secret: 'coder',
    resave: true,
    saveUninitialized: true,
})

module.exports = sessionLocal