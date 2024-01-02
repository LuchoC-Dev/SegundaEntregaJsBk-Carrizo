import ResponseStatus from '../class/ResponseStatus.js';

const checkProductBody = (req, res, next) => {
  try {
    if (checkBody(req.body)) {
      next();
    }
  } catch (error) {
    console.error(error);
    const status = ResponseStatus.error(error.message);
    res.json(status);
  }
};

const checkBody = (body) => {
  const {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    status,
    category,
  } = body;
  return (
    checkTitle(title) &&
    checkDescription(description) &&
    checkPrice(price) &&
    checkThumbnail(thumbnail) &&
    checkCode(code) &&
    checkStock(stock) &&
    checkStatus(status) &&
    checkCategory(category)
  );
};

const checkTitle = (title) => {
  if (!title || title.length < 5) {
    throw new Error(
      `Titulo ingresado invalido, debe tener una longitud de al menos 5 caracteres`,
    );
  }
  return true;
};

const checkDescription = (description) => {
  if (!description || description.length < 5) {
    throw new Error(
      `Descripcion ingresada invalida, debe tener una longitud de al menos 5 caracteres`,
    );
  }
  return true;
};

const checkPrice = (price) => {
  const isNumber = /^[+-]?\d+(\.\d+)?$/.test(price); //chequear si es un numero real
  if (!price || !isNumber || parseFloat(price) < 0) {
    throw new Error(`Precio ingresado invalido, debe ser un numero positivo`);
  }
  return true;
};

const checkThumbnail = (thumbnail) => {
  if (!Array.isArray(thumbnail)) {
    throw new Error(`Thumbnail ingresado invalido, debe ser un array`);
  }
  thumbnail.forEach((element) => {
    const extension = element.split('.').reverse()[0];
    if (!isImage(extension.toLowerCase())) {
      throw new Error(
        `Thumbnail ingresado invalido, debe ser una imagen valida`,
      );
    }
  });
  return true;
};

const isImage = (value) => {
  const validExtensions = ['jpg', 'jpeg', 'png'];
  if (validExtensions.includes(value)) {
    return true;
  }
  return false;
};

const checkCode = (code) => {
  if (!code || code.length < 6 || code.length > 12) {
    throw new Error(
      `Code ingresado invalido, debe ser un codigo entre 6 y 12 digitos`,
    );
  }
  return true;
};

const checkStock = (stock) => {
  const isNumber = /^[+-]?\d+(\.\d+)?$/.test(stock); //chequear si es un numero real
  if (!stock || !isNumber || !Number.isInteger(Number(stock))) {
    throw new Error(`Precio ingresado invalido, debe ser un numero positivo`);
  }
  return true;
};

const checkStatus = (status) => {
  const isBoolean =
    typeof status === 'boolean' || status === 'true' || status === 'false';
  if (!isBoolean) {
    throw new Error(`Status ingresado invalido, debe ser un booleano`);
  }
  return true;
};

const checkCategory = (category) => {
  if (!category || category.length < 3) {
    throw new Error(
      `Category ingresada invalida, debe ser una category valida (3 caracteres minimos)`,
    );
  }
  return true;
};

export default checkProductBody;
