import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { specs, swaggerUi } from './config/swagger.config.js';

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import authRouter from './routes/auth.router.js';
import adoptionRouter from './routes/adoption.router.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', authRouter);
app.use('/api/adoptions', adoptionRouter);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/products', (req, res) => {
  res.render('index', {
    products: [], 
    totalPages: 1,
    page: 1,
    hasPrevPage: false,
    hasNextPage: false
  });
});

app.get('/carts/:cid', (req, res) => {
  res.render('cart', {
    cart: {
      _id: req.params.cid,
      products: []
    }
  });
});

app.get('/', (req, res) => {
  res.redirect('/products');
});

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pastasMilisenda';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado');
    app.listen(PORT, () => {
      console.log(`Servidor en puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error MongoDB:', err);
    process.exit(1);
  });

export default app;

