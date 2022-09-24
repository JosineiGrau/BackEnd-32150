// server con express

const express = require('express');
const Container = require('./container');

const product = new Container('./src/desafio3/db.txt');

// crear servidor usando express
const app = express();

// configurar las rutas
app.get('/', (req, res) => {
	res.send(`<h1 style= "color:blue">Hola soy josinei</h1>`);
});

// ruta de productos
app.get('/productos', async (req, res) => {
	const getProductos = await product.getAll();
	res.send(getProductos);
});

// ruta para recuperar un producto al azar
app.get('/producto-random', async (req, res) => {
	const getProduct = await product.getAll();
	const productRandom =
		getProduct[Math.floor(Math.random() * getProduct.length)];
	res.send(productRandom);
});

// ejecutar el servidor
app.listen(8080, () => {
	console.log(
		`servidor ejecutado en el puerto 8080 ${'http://localhost:8080/'}`
	);
});
