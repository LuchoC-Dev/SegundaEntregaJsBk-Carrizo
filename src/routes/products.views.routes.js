import { Router } from 'express';
import { rootURL } from '../utils/env.js';
import ResponseStatus from '../class/ResponseStatus.js';
import checkProductsQuery from '../middlewares/checkProductsQuery.js';
import ProductDao from '../daos/Product.dao.js';

const productsViewsRouter = Router();
const path = '/products/';

//GET products filter
productsViewsRouter.get(path, checkProductsQuery, async (req, res) => {
  try {
    const { parseLimit, parsePage, parseSort, parseQuery, limit, sort, query } =
      req.query;
    const data = await ProductDao.getProducts(
      parseLimit,
      parsePage,
      parseSort,
      parseQuery,
    );

    data.prevLink = data.hasPrevPage
      ? `${rootURL}${path}?limit=${limit}&&page=${data.prevPage}&&sort=${sort}&&query=${query}`
      : null;

    data.nextLink = data.hasNextPage
      ? `${rootURL}${path}?limit=${limit}&&page=${data.nextPage}&&sort=${sort}&&query=${query}`
      : null;

    res.render('products', {
      ...data,
      rootURL,
      css: 'products.css',
    });
  } catch (error) {
    console.error(error);
    res.json(ResponseStatus.error(error));
  }
});

productsViewsRouter.post(path + ':id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductDao.getProductById(id);
    res.render('product', {
      product,
      css: 'product.css',
    });
  } catch (error) {
    console.error(error);
    res.json(ResponseStatus.error(error));
  }
});

export default productsViewsRouter;
