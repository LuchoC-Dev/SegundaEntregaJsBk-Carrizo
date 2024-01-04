import { addNewMessage, generateMessages } from './dom.js';
import { socketListener, emit } from './socket.js';
import { eventsInit } from './events.js';

eventsInit();
socketListener();
