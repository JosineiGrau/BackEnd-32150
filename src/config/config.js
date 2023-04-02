import dotenv from 'dotenv';
import args from '../utils/parseArgs.js';
console.log(args);
dotenv.config();

const env = process.env.NODE_ENV

let dataBase = process.env.DB_TYPE

if (env === 'dev') {
    dataBase = 'FS'
}

const config = {
	server: {
		PORT: process.env.PORT || args.port,
		mode: process.env.DB_MODE || args.mode,
		dbType: dataBase || args.dataBase,
	},
	mongoDB: {
		mongoUrl: process.env.DB_MONGO_URL,
	},
    nodeMailer: {
        email: process.env.TEST_EMAIL,
        password: process.env.TEST_PASSWORD,
    }
};

export default config;
