// Basic imports
import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import db from './dataBase.js';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';

// Utils imports
import { __dirProyecto, __dirSrc } from './utils/dirnames.js';
import { PORT, rootURL } from './utils/env.js';

// Routes imports
import rootRouter from './routes/root.routes.js';
import productsRouter from './routes/products.routes.js';
import cartRouter from './routes/carts.routes.js';

// Express Init
const app = express();

// Global Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public link
app.use(express.static(`${__dirProyecto}/public`));

// App listen
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en: ${rootURL}`);
});

// Socket.io Init
const io = new Server(httpServer);
const chatIo = io.of('/chat');

// Handlebars Init
app.engine(
  'hbs',
  handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(handlebars),
  }),
);
app.set('view engine', 'hbs');
app.set('views', `${__dirSrc}/views`);

// Mongroose
db();

// Comunicacion con el Socket // MOVER ESTO
chatIo.on('connection', (socketClient) => {
  console.log(`Nuevo cliente conectado |-->| ID:${socketClient.id}`);
});

// Routes
app.use('/', rootRouter);
app.use('/', productsRouter);
app.use('/', cartRouter);
