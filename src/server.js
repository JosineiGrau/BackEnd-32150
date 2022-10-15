const express = require('express');
const app = express();
const path = require('path');
const { productsRoutes } = require('./routes/products');
const { homeRouter } = require('./routes/pages');

// SETTINGS
app.set('case sensitive routing', true);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.use(homeRouter);
app.use('/api/products', productsRoutes);

const server = app.listen(8080, () => {
	console.log(`tu servidor: http://localhost:${server.address().port}`);
});

app.use((req, res, next) => {
	res.status(404).send('<h1>error 404</h1>');
});
