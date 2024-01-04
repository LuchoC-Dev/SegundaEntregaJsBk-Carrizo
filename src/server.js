// Basic imports
import express from 'express';
import handlebars from 'express-handlebars';
import Handlebars from 'handlebars';
import db from './dataBase.js';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';

// Utils imports
import { __dirProyecto, __dirSrc } from './utils/dirnames.js';
import { PORT, rootURL } from './utils/env.js';

// Routes imports
import rootRouter from './routes/root.api.routes.js';
import productsRouter from './routes/products.api.routes.js';
import cartRouter from './routes/carts.api.routes.js';
import productsViewsRouter from './routes/products.views.routes.js';
import cartsViewsRouter from './routes/carts.views.routes.js';
import rootViewRouter from './routes/root.views.routes.js';
import rootSocket from './sockets/root.sockets.js';

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
rootSocket(httpServer);

// Handlebars Init
app.engine(
  'hbs',
  handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  }),
);
app.set('view engine', 'hbs');
app.set('views', `${__dirSrc}/views`);

// Mongroose
db();

// Routes
app.use('/', rootRouter);
app.use('/', productsRouter);
app.use('/', cartRouter);
app.use('/', rootViewRouter);
app.use('/', productsViewsRouter);
app.use('/', cartsViewsRouter);
