import ResponseStatus from '../class/ResponseStatus.js';

const checkProductsQuery = async (req, res, next) => {
  try {
    const { limit, page, sort, query } = checkParams(req);
    req.query.parseLimit = limit;
    req.query.parsePage = page;
    req.query.parseSort = sort;
    req.query.parseQuery = query;

    next();
  } catch (error) {
    console.error(error);
    res.json(ResponseStatus.error(error.message));
  }
};

const checkParams = (req) => {
  return {
    limit: checkLimit(req.query.limit),
    page: checkPage(req.query.page),
    sort: checkSort(req.query.sort),
    query: checkQuery(req.query.query),
  };
};

const isFalsy = (value) => {
  return !value || value === 'null' || value === 'undefined';
};

const checkLimit = (limit) => {
  if (isFalsy(limit)) {
    return 10;
  }
  const isNumber = /^[1-9]\d*$/.test(limit);
  if (!isNumber) {
    throw new Error(`El "limit": ${limit}, No es un numero valido`);
  }
  return Number(limit);
};

const checkPage = (page) => {
  if (isFalsy(page)) {
    return 1;
  }
  const isNumber = /^[1-9]\d*$/.test(page);
  if (!isNumber) {
    throw new Error(`El "page": ${page}, No es un numero valido`);
  }
  return Number(page);
};

const checkSort = (sort) => {
  if (isFalsy(sort)) {
    return null;
  }
  const validValues = ['asc', 'des', 1, -1];
  const isValid = validValues.includes(sort);
  if (!isValid) {
    throw new Error(`El "sort": ${sort}, No es un tipo valido`);
  }
  return parseSort(sort);
};

const parseSort = (sort) => {
  if (sort === 'asc' || sort === 1) {
    return { price: 1 };
  }
  return { price: -1 };
};

// Mas adelante, añadir la verificacion de los querys validos
const checkQuery = (query) => {
  if (isFalsy(query)) {
    return null;
  }
  return JSON.parse(query);
};

export default checkProductsQuery;
