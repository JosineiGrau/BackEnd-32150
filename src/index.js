const express = require('express');
const { productsRoutes } = require('./routes/products');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(8080, () => {
	console.log(`tu servidor: http://localhost:${server.address().port}`);
});

app.use('/api/products', productsRoutes);
