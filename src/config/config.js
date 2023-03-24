import dotenv from 'dotenv';
import args from '../utils/parseArgs.js';
console.log(args);
dotenv.config();

const config = {
	server: {
		PORT: args.port || process.env.PORT,
		mode: args.mode,
		env: args.mode,
		dbType: args.dataBase || process.env.DB_TYPE,
	},
	mongoDB: {
		mongoUrl: process.env.DB_MONGO_URL,
	},
};

export default config;
