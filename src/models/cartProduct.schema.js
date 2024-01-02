import { Schema } from 'mongoose';

const cartProductSchema = new Schema({
  prodId: {
    type: Schema.Types.ObjectId,
    ref: 'product',
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

export default cartProductSchema;
