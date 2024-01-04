import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  message: {
    type: String,
    require: true,
    index: false,
  },
  type: {
    type: String,
    enum: ['success', 'error', 'info'],
    require: true,
  },
  sender: {
    type: String,
    enum: ['user', 'server'],
    require: true,
  },
});

const messageModel = model('messages', messageSchema);

export default messageModel;
