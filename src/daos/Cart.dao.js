import cartModel from '../models/cart.model';

class CartDao {
  static async getAllCarts() {
    return await cartModel.find({});
  }
}

export default CartDao;
