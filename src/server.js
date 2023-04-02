import express from 'express';
import dotenv from 'dotenv';
import os from 'os';
import cookieParser from 'cookie-parser';
import { StoreSession } from './middleware/storeSession.js';
import passport from './helpers/localStrategy.js';
import serializer from './utils/serialize.js';
import deserialize from './utils/deserialize.js';
import { apiRouter } from './routes/index.js';
import errors from './networks/errors.js';
import args from './utils/parseArgs.js';
import cluster from 'cluster';
import config from './config/config.js';

dotenv.config();

const numerosCPUs = os.cpus().length;

const app = express();

// SETTINGS
app.set('case sensitive routing', true);
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '/public')));
app.use(cookieParser());
app.use(StoreSession);
app.use(passport.initialize()); // conectamos a passport con express
app.use(passport.session()); // vinculamos entre passport y las sesiones de los usuarios

serializer();
deserialize();
// ROUTES
apiRouter(app);

// Escuche todos los errores
app.use(errors);

if (args.mode === 'cluster' && cluster.isPrimary) {
	for (let i = 0; i < numerosCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, err) => {
		console.log(`El subProceso ${worker.process.pid} dejo de funcionar`);

		cluster.fork();
	});
} else {
	const server = app.listen(config.server.PORT, () => {
		console.log(
			`tu servidor: http://localhost:${server.address().port} el proceso es ${
				process.pid
			}`
		);
	});
}

export default app;
