import { Server } from 'socket.io';
import CrudManager from '../class/CrudManager.js';

const apiSocket = (server) => {
  const rootIo = new Server(server);
  const io = rootIo.of('/api');
  const emitAll = (eventName, value) => {
    io.emit(eventName, value);
  };
  const newMessage = {
    message: 'hola del server',
    type: 'info',
    sender: 'server',
  };

  io.on('connection', async (socketClient) => {
    const emit = (eventName, value) => {
      socketClient.emit(eventName, value);
    };
    console.log(`Nuevo cliente conectado | ID:${socketClient.id}`);

    emitAll('serverStatus', 'Servidor Reiniciado');
    emit('serverStatus', `Tu id es el siguiente: ${socketClient.id}`);

    messageListen(socketClient);
    crudMessagesListen(socketClient);
  });
};

const messageListen = (socketClient) => {
  socketClient.on('message', (message) => {
    console.log(message);
  });
};

const crudMessagesListen = (socketClient) => {
  socketClient.on('crudMessages', async (message) => {
    console.log(message);
    console.log(await CrudManager.main(message));
  });
};

export default apiSocket;
