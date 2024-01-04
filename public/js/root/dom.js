import { emit } from './socket.js';

const addNewMessage = (newMessageObject, lastMessageObject) => {
  console.log('hola');
  if (lastMessageObject) {
    const {
      message: lastMessage,
      type: lastType,
      sender: lastSender,
    } = lastMessageObject;
    addToMessages(lastMessage, lastType, lastSender);
  }

  const { message, type, sender } = newMessageObject;
  addToLastMessage(message, type, sender);
};

const generateMessages = (messages) => {
  if (messages.length === 0) {
    return;
  }
  messages.forEach((object, index) => {
    const { type, message, sender } = object;
    if (isLastIndex(messages, index)) {
      addToLastMessage(message, type, sender);
    } else {
      addToMessages(message, type, sender);
    }
  });
};

const isLastIndex = (array, index) => {
  return index === array.length - 1;
};

const addToMessages = (message, type, sender) => {
  const messagesContainer = document.getElementById('messages-container');
  const divMessage = document.createElement('div');
  divMessage.textContent = message;
  divMessage.className = `messages type-${type} sender-${sender}`;
  messagesContainer.appendChild(divMessage);
};

const addToLastMessage = (message, type, sender) => {
  const lastMessageContainer = document.getElementById('lastMessage-container');
  removeLastMessage();

  const divMessage = document.createElement('div');
  divMessage.textContent = message;
  divMessage.className = `lastMessage type-${type} sender-${sender}`;
  lastMessageContainer.appendChild(divMessage);
};

const removeLastMessage = () => {
  const lastMessageContainer = document.getElementById('lastMessage-container');

  while (lastMessageContainer.firstChild) {
    lastMessageContainer.removeChild(lastMessageContainer.firstChild);
  }
};

export { addNewMessage, generateMessages };
