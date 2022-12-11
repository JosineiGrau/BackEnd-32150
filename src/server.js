import express from 'express';
import { apiRouter } from './routes/index.js';
import { errors } from './networks/errors.js';
import path from 'path'
import { fileURLToPath } from 'url';
import { socket } from './socket.js';
import cookieParser from 'cookie-parser';
import { StoreSession } from './middleware/storeSession.js';
import { mongo } from './middleware/MongoDB.js';
import { passport } from './config/localStrategy.js';
import { deserialize } from './utils/deserialize.js';
import { serializer } from './utils/serialize.js';

mongo()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();
const PORT = process.env.PORT || 8080
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

// Escuche todos los errores
app.use(errors)

const server = app.listen(PORT, () => {
	console.log(`tu servidor: http://localhost:${server.address().port}`);
});

socket(server)