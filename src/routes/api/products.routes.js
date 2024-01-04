import { Router } from 'express';
import ProductDao from '../../data/daos/Product.dao.js';
import checkProductsQuery from '../../middlewares/checkProductsQuery.js';
import checkProductBody from '../../middlewares/checkProductBody.js';

import { rootURL } from '../../utils/env.js';
import ResponseStatus from '../../class/ResponseStatus.js';

const productsRouter = Router();
const path = '/api/products/';

// GET getProducts global
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

//GET getProductsById
productsRouter.get(path + ':id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductDao.getProductById(id);
    res.json(product);
    console.log(product);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

//POST addProduct by body
productsRouter.post(path, checkProductBody, async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock, category, id } =
      req.body;
    const product = {
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
      category: category,
      _id: id,
    };
    const status = await ProductDao.addProduct(product);
    res.json(status);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

//PUT updateById
productsRouter.put(path + ':id', checkProductBody, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    } = req.body;

    const product = {
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
      category: category,
      status: status,
      _id: id,
    };
    const infoStatus = await ProductDao.updateProduct(id, product);
    res.json(infoStatus);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

//DELETE removeProduct
productsRouter.delete(path + ':id', async (req, res) => {
  try {
    const { id } = req.params;
    const status = await ProductDao.deleteProduct(id);
    res.json(status);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

//DELETE deleteAllProducts
productsRouter.delete(path, async (req, res) => {
  try {
    const { status } = req.query;
    if (!status || status !== 'true') {
      throw new Error('Status invalido');
    }
    const clearProducts = await ProductDao.deleteAllProducts();
    res.json(clearProducts);
  } catch (error) {
    console.error(error);
    res.json({ error: error.message });
  }
});

export default productsRouter;
