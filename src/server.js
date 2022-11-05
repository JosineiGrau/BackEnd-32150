import express from 'express';
import { apiRouter } from './routes/index.js';
import { errors } from './networks/errors.js';
import { createTableChats, createTableProduct } from './db/createTable.js';
import { socket } from './socket.js';
import path from 'path'
import { fileURLToPath } from 'url';

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
app.use(express.static(path.join(__dirname, '/public')))
apiRouter(app)

createTableChats()
createTableProduct()


// Escuche todos los errores
app.use(errors)

const server = app.listen(PORT, function(){
	console.log(`tu servidor: http://localhost:${this.address().port}`);
});
 
socket(server)