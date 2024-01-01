import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'products',
    },
  ],
  quantity: {
    type: Number,
    default: 0,
  },
});

const cartModel = model('carts', cartSchema);

export default cartModel;
