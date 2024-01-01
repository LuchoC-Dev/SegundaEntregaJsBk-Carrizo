import { Router } from 'express';
import ProductDao from '../daos/Product.dao.js';
import checkProductsQuery from '../middlewares/checkProductsQuery.js';

import { rootURL } from '../utils/env.js';
import ResponseStatus from '../class/ResponseStatus.js';

const productsRouter = Router();
const path = '/products/';

// Get All
productsRouter.get(path, checkProductsQuery, async (req, res) => {
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

    res.json(ResponseStatus.make(data));
  } catch (error) {
    console.error(error);
    res.json(ResponseStatus.error(error));
  }
});

export default productsRouter;
