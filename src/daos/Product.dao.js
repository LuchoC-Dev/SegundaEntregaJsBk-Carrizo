import productModel from '../models/product.model.js';

class ProductDao {
  static async getAllProducts() {
    return await productModel.find();
  }

  static async getProducts(limit, page, sort, query) {
    const data = await productModel.paginate(query, { limit, page, sort });
    return data;
  }
}

export default ProductDao;
