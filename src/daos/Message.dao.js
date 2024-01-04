import messageModel from '../models/message.model.js';

class MessageDao {
  static async getAll() {
    return await messageModel.find();
  }
  static async getById(id) {
    return await messageModel.findById(id);
  }
  static async add(message) {
    return await messageModel.create(message);
  }
  static async create() {
    const getRandom = () => {
      return {
        message: `Este es un mensaje de prueba`,
        type: `info`,
        sender: `server`,
      };
    };
    return await messageModel.create(getRandom());
  }
  static async createMany(quantity) {
    const messages = [];
    for (let index = 0; index < quantity; index++) {
      messages.push(await this.create());
    }
    return messages;
  }
  static async update(id, message) {
    return await messageModel.findByIdAndUpdate(id, message, { new: true });
  }
  static async getLast() {
    return await messageModel.findOne().sort({ _id: -1 });
  }
  static async clear() {
    return await messageModel.deleteMany({});
  }
}

export default MessageDao;
