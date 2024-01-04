import { Router } from 'express';
import CartDao from '../data/daos/Cart.dao.js';
import { rootURL } from '../utils/env.js';

const cartsViewsRouter = Router();
const path = '/carts/';

cartsViewsRouter.get(path, async (req, res) => {
  try {
    const { productId } = req.query;
    const lastCart = await CartDao.getLastCart();
    await CartDao.addProductToCart(lastCart._id, productId);
    console.log('Añadido exitosamente al ultimo carrito');
    res.redirect(`${rootURL}/products/`);
  } catch (error) {
    console.error(error);
    res.json({ status: 'Error', message: error });
  }
});

cartsViewsRouter.get(path + ':id', async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await CartDao.getCartById(id);
    const products = cart.products;
    res.render('carts', {
      products,
      css: 'carts.css',
    });
  } catch (error) {
    console.error(error);
    res.json({ status: 'Error', message: error });
  }
});

export default cartsViewsRouter;
