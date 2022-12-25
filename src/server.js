const express = require('express')
const path = require('path')
const { apiRouter } = require('./routes/index.js')
const errors = require('./networks/errors')
const socket = require('./socket')
const cookieParser = require('cookie-parser')
const StoreSession = require('./middleware/storeSession')
const mongo = require('./middleware/MongoDB')
const passport = require('./config/localStrategy')
const deserialize = require('./utils/deserialize')
const serializer = require('./utils/serialize')
const dotenv = require('dotenv')
const os = require('os')
const cluster = require('cluster')
const args = require('./utils/parseArgs')

dotenv.config()

mongo()

const numerosCPUs = os.cpus().length

const app = express();
const PORT = args.puerto || 8080
console.log(args.puerto)
// SETTINGS
app.set('case sensitive routing', true);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(cookieParser())
app.use(StoreSession)
app.use(passport.initialize()) // conectamos a passport con express
app.use(passport.session()) // vinculamos entre passport y las sesiones de los usuarios

serializer()
deserialize()
// ROUTES
apiRouter(app)

console.log(args)
// Escuche todos los errores
app.use(errors)

if (args.mode === 'cluster') {
	if (cluster.isPrimary) {
		for (let i = 0; i < numerosCPUs; i++) {
			cluster.fork()
		}
	
		cluster.on('exit', (worker, err) => {
			console.log(`El subProceso ${worker.process.pid} dejo de funcionar`)
	
			cluster.fork()
		})
	} else {
		const server = app.listen(PORT, () => {
			console.log(`tu servidor: http://localhost:${server.address().port} el proceso es ${process.pid}`);
		});
		socket(server)
	}
} else {
	const server = app.listen(PORT, () => {
		console.log(`tu servidor: http://localhost:${server.address().port} el proceso es ${process.pid}`);
	});
	socket(server)
}


