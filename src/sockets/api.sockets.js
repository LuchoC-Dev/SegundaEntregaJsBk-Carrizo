import { Server } from 'socket.io';
import CrudManager from '../class/CrudManager.js';
import MessageDao from '../data/daos/Message.dao.js';

// Main

const apiSocket = (server) => {
  const rootIo = new Server(server);
  const io = rootIo.of('/api');

  io.on('connection', async (socketClient) => {
    emitInitMessage(socketClient);
    listener(socketClient);
  });

  // Emits

  const emitInitMessage = async (socketClient) => {
    console.log(`Nuevo cliente conectado | ID:${socketClient.id}`);
    io.emit('serverStatus', 'Servidor Conectado Correctamente');
    socketClient.emit(
      'serverStatus',
      `Tu id de conexion es el siguiente | ID: ${socketClient.id}`,
    );
    socketClient.emit('consoleMessages-set', await MessageDao.getAll());
  };

  // Listener

  const listener = (socketClient) => {
    messageListen(socketClient);
    crudMessagesListen(socketClient);
  };

  const messageListen = (socketClient) => {
    socketClient.on('message', (message) => {
      console.log(message);
    });
  };

  const crudMessagesListen = (socketClient) => {
    socketClient.on('crudMessages', async (message) => {
      const status = await CrudManager.main(message);
      crudMessageCheck(status, socketClient);
    });
  };

  const crudMessageCheck = (statusObj, socket) => {
    const checkResponse = (req, res) => {
      if (req.body.dao === 'messages') {
        if (req.action === 'createMany') {
          res.forEach((element) => {
            io.emit('consoleMessages-add', {
              author: 'server',
              status: 'success',
              message: element.message,
            });
          });
        } else if (req.action === 'clear') {
          io.emit('consoleMessages-set', []);
        }
      }
    };
    const { status, message, req, res } = statusObj;

    if (status === 'error') {
      const resMessage = {
        author: 'server',
        status: 'error',
        message: message,
      };
      socket.emit('consoleMessages-add', resMessage);
    } else if (status === 'success') {
      checkResponse(req, res);
      const resMessage = {
        author: 'server',
        status: 'success',
        message: message,
      };
      socket.emit('consoleMessages-add', resMessage);
    }
  };
};

export default apiSocket;
