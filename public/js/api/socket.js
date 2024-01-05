import { addNewMessage, setMessages } from './dom.js';

const socket = io('/api');

let consoleMessages = [];

const socketListener = () => {
  listenConsoleMessagesSet();
  listenServerStatus();
  listenMessages();
  listenConsoleMessagesAdd();
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

const listenConsoleMessagesAdd = () => {
  socket.on('consoleMessages-add', (message) => {
    addNewMessage(message, consoleMessages.reverse()[0]);
    consoleMessages.push(message);
  });
};

const listenConsoleMessagesSet = () => {
  socket.on('consoleMessages-set', (messages) => {
    consoleMessages = [];
    setMessages(messages);
    consoleMessages.push(...messages);
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
