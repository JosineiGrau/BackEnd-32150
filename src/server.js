import express from 'express';
import { apiRouter } from './routes/index.js';
import { errors } from './networks/errors.js';


const app = express();
const PORT = process.env.PORT || 8080
// SETTINGS
app.set('case sensitive routing', true);

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

apiRouter(app)

app.use(errors)

app.listen(PORT, function(){
	console.log(`tu servidor: http://localhost:${this.address().port}`);
});
