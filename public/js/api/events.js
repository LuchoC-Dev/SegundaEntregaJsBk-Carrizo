import { createCrudMessage, emit } from './socket.js';

const eventsInit = () => {
  eventGenerateMessages();
  eventGenerateProducts();
  eventGenerateCarts();
  eventDeleteAllMessages();
  eventDeleteAllProducts();
  eventDeleteAllCarts();
};

const eventGenerateTemplete = (templete) => {
  const generateButton = document.getElementById(`generate-${templete}-button`);

  generateButton.addEventListener('click', () => {
    const generateInput = document.getElementById(`generate-${templete}-input`);
    const value = generateInput.value;
    const message = createCrudMessage('client', 'post', 'createMany', {
      dao: templete,
      value: value,
    });
    emit('crudMessages', message);
  });
};

const eventDeleteAllTemplete = (templete, trueValue) => {
  const parseTemplete =
    templete.charAt(0).toLocaleUpperCase() + templete.slice(1);
  const deteleAllButton = document.getElementById(
    `delete-all${parseTemplete}-button`,
  );

  deteleAllButton.addEventListener('click', () => {
    const deleteAllInput = document.getElementById(
      `delete-all${parseTemplete}-input`,
    );
    const value = deleteAllInput.value;
    if (value !== trueValue) {
      console.error('Clave invalida');
      return;
    }
    const message = createCrudMessage('client', 'delete', 'clear', {
      dao: templete,
    });
    emit('crudMessages', message);
  });
};

const eventGenerateMessages = () => {
  eventGenerateTemplete('messages');
};
const eventGenerateProducts = () => {
  eventGenerateTemplete('products');
};
const eventGenerateCarts = () => {
  eventGenerateTemplete('carts');
};

const eventDeleteAllMessages = () => {
  eventDeleteAllTemplete('messages', 'eliminarMensajes');
};
const eventDeleteAllProducts = () => {
  eventDeleteAllTemplete('products', 'eliminarProductos');
};
const eventDeleteAllCarts = () => {
  eventDeleteAllTemplete('carts', 'eliminarCarritos');
};

export { eventsInit };
