import { Schema, model } from 'mongoose';
import cartProductSchema from './cartProduct.schema.js';

const cartSchema = new Schema({
  products: {
    type: [
      {
        type: cartProductSchema,
      },
    ],
    default: [],
    index: false,
  },
});

const cartModel = model('carts', cartSchema);

export default cartModel;
