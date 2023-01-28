const dotenv = require('dotenv');
dotenv.config()

const config = {
    admin : true,
    JWT_KEY: process.env.JWT_SECRET,
    dataBase: 'Mongo'
}

module.exports = config
