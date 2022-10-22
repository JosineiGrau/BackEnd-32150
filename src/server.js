const express = require('express');
const path = require('path');
const {Server} = require("socket.io")
// rutas
const { productsRoutes } = require('./routes/products');
const { homeRouter } = require('./routes/pages');
// lógica
const { Message } = require("./message");
const { Container } = require('./container');
const newMessage = new Message("messages.txt")
const newProduct = new Container("db.txt")

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

app.use(homeRouter);
app.use('/api/products', productsRoutes);

const server = app.listen(PORT, () => {
	console.log(`tu servidor: http://localhost:${server.address().port}`);
});

const io = new Server(server)
io.on("connection",(socket)=>{
	console.log("nuevo socket o cliente conectado",socket.id);
	socket.on("clientMessage",async (data)=>{
		await newMessage.saveMessage(data)
		const messageHistory = await newMessage.getAll()
		io.sockets.emit("messageHistory",messageHistory)
	})
	socket.on("userEscribiendo",(data)=>{
		socket.broadcast.emit("usuarioRecibido",data)
	})

	socket.on('newProduct', async (data) => {
		// console.log(data);
		await newProduct.save(data)
		const productHistory = await newProduct.getAll()
		io.sockets.emit('productHistory',productHistory)
	})
})

app.use((req, res, next) => {
	res.status(404).send('<h1>error 404</h1>');
});
