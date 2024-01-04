import CartDao from '../data/daos/Cart.dao.js';
import MessageDao from '../data/daos/Message.dao.js';
import ProductDao from '../data/daos/Product.dao.js';

class CrudManager {
  static async main(message) {
    const isValidMessage = (message) => {
      if (
        !isValidAutor(message?.author) ||
        !isValidMethod(message?.method) ||
        !isValidAction(message?.method, message?.action) ||
        !isValidBody(message?.body)
      ) {
        return false;
      }
      return true;
    };

    const isValidAutor = (author) => {
      const validAuthors = ['client', 'server'];
      return validAuthors.includes(author);
    };

    const isValidMethod = (method) => {
      const validMethods = ['get', 'post', 'put', 'delete'];
      return validMethods.includes(method);
    };

    const isValidAction = (method, action) => {
      if (method === 'get') {
        const validGetActions = ['getAll', 'get'];
        return validGetActions.includes(action);
      } else if (method === 'post') {
        const validPostActions = ['add', 'create', 'createMany'];
        return validPostActions.includes(action);
      } else if (method === 'put') {
        const validPutActions = ['update'];
        return validPutActions.includes(action);
      } else if (method === 'delete') {
        const validDeleteActions = ['delete', 'clear'];
        return validDeleteActions.includes(action);
      }
      return false;
    };

    const isValidBody = (body) => {
      const { dao } = body;
      const validDaos = ['carts', 'messages', 'products'];
      return validDaos.includes(dao);
    };

    const start = async (message) => {
      const { action, body } = message;
      const { dao, id, value } = body;
      const daoMap = {
        carts: CartDao,
        messages: MessageDao,
        products: ProductDao,
      };
      if (id && value) {
        return await daoMap[dao][action](id, value);
      } else if (id) {
        return await daoMap[dao][action](id);
      } else if (value) {
        return await daoMap[dao][action](value);
      } else {
        return await daoMap[dao][action]();
      }
    };

    try {
      if (!isValidMessage(message)) {
        throw new Error('El mensage ingresado es invalido');
      }
      return await start(message);
    } catch (error) {
      console.error(error);
    }
  }
}

export default CrudManager;
