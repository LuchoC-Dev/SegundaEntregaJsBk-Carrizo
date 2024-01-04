import { Server } from 'socket.io';
import CrudManager from '../class/CrudManager.js';

// Main

const apiSocket = (server) => {
  const rootIo = new Server(server);
  const io = rootIo.of('/api');

  io.on('connection', async (socketClient) => {
    emitInitMessage(io, socketClient);
    listener(socketClient);
  });
};

// Emits

const emit = (socket, eventName, value) => {
  socket.emit(eventName, value);
};

const emitAll = (io, eventName, value) => {
  emit(io, eventName, value);
};

const emitInitMessage = (io, socketClient) => {
  console.log(`Nuevo cliente conectado | ID:${socketClient.id}`);
  emitAll(io, 'serverStatus', 'Servidor Conectado Correctamente');
  emit(
    socketClient,
    'serverStatus',
    `Tu id de conexion es el siguiente | ID: ${socketClient.id}`,
  );
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
    console.log(message);
    console.log(await CrudManager.main(message));
  });
};

export default apiSocket;
