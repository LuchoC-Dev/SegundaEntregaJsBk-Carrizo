const socket = io('/api');

const socketListener = () => {
  listenServerStatus();
  listenMessages();
};

const listenServerStatus = () => {
  socket.on('serverStatus', (message) => {
    console.log(message);
  });
};

const listenMessages = () => {
  socket.on('message', (message) => {
    console.log(message);
  });
};

const createCrudMessage = (author, method, action, body) => {
  return {
    author: author,
    method: method,
    action: action,
    body: body,
  };
};
const emit = (eventName, value) => {
  socket.emit(eventName, value);
};

export { socketListener, emit, createCrudMessage };
