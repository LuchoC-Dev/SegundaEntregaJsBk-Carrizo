import cartModel from '../models/cart.model.js';

class CartDao {
  static async getAllCarts() {
    return await cartModel.find({});
  }
  static async getCartById(id) {
    return await cartModel.findById(id).populate('products.prodId');
  }
  static async addCart(cart) {
    return await cartModel.create(cart);
  }
  static async createCart() {
    return await cartModel.create({});
  }
  static async addProductToCart(idCart, idProduct) {
    const cart = await cartModel.findById(idCart);

    const prodIndex = cart.products.findIndex((cartProduct) => {
      return String(cartProduct.prodId) === String(idProduct);
    });
    if (prodIndex < 0) {
      cart.products.push({ prodId: idProduct, quantity: 1 });
    } else {
      cart.products[prodIndex].quantity++;
    }

    await cart.save();
    return await cart.populate('products.prodId');
  }
  static async updateCart(id, cart) {
    return await cartModel
      .findByIdAndUpdate(id, cart, {
        new: true,
      })
      .populate('products.prodId');
  }
  static async updateCartProducts(id, cartProducts) {
    return await cartModel
      .findByIdAndUpdate(
        id,
        { products: cartProducts },
        {
          new: true,
        },
      )
      .populate('products.prodId');
  }
  static async updateCartProductQuantity(idCart, idProduct, quantity) {
    return await cartModel
      .findOneAndUpdate(
        { _id: idCart, 'products.prodId': idProduct },
        { 'products.$.quantity': quantity },
        {
          new: true,
        },
      )
      .populate('products.prodId');
  }
  static async deleteCart(id) {
    return await cartModel.findByIdAndDelete(id);
  }
  static async clearCart(id) {
    return await cartModel.findByIdAndUpdate(
      id,
      { products: [] },
      { new: true },
    );
  }
  static async clearAllCarts() {
    return await cartModel.deleteMany({});
  }
  static async getLastCart() {
    return await cartModel.findOne().sort({ _id: -1 });
  }
}

export default CartDao;
