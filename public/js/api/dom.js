const addNewMessage = (newMessageObject, lastMessageObject) => {
  if (lastMessageObject) {
    const {
      author: lastAuthor,
      status: lastStatus,
      message: lastMessage,
    } = lastMessageObject;
    addToMessages(lastAuthor, lastStatus, lastMessage);
  }

  const { author, status, message } = newMessageObject;
  addToLastMessage(author, status, message);
};

const setMessages = (messages) => {
  removeAllMessages();
  generateMessages(messages);
};

const generateMessages = (messages) => {
  if (messages.length === 0) {
    return;
  }
  messages.forEach((object, index) => {
    const { author, status, message } = object;
    if (isLastIndex(messages, index)) {
      addToLastMessage(author, status, message);
    } else {
      addToMessages(author, status, message);
    }
  });
};

const isLastIndex = (array, index) => {
  return index === array.length - 1;
};

const addToMessages = (author, status, message) => {
  const messagesContainer = document.getElementById('messages-container');
  const divMessage = document.createElement('div');
  divMessage.textContent = message;
  divMessage.className = `messages type-${status} sender-${author}`;
  messagesContainer.appendChild(divMessage);
};

const addToLastMessage = (author, status, message) => {
  const lastMessageContainer = document.getElementById('lastMessage-container');
  removeLastMessage();

  const divMessage = document.createElement('div');
  divMessage.textContent = message;
  divMessage.className = `lastMessage type-${status} sender-${author}`;
  lastMessageContainer.appendChild(divMessage);
};

const removeLastMessage = () => {
  const lastMessageContainer = document.getElementById('lastMessage-container');

  while (lastMessageContainer.firstChild) {
    lastMessageContainer.removeChild(lastMessageContainer.firstChild);
  }
};

const removeMessages = () => {
  const messagesContiner = document.getElementById('messages-container');

  while (messagesContiner.firstChild) {
    messagesContiner.removeChild(messagesContiner.firstChild);
  }
};

const removeAllMessages = () => {
  removeMessages();
  removeLastMessage();
};

export { setMessages, addNewMessage, generateMessages };
