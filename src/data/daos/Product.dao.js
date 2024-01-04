import productModel from '../models/product.model.js';

class ProductDao {
  static async getAll() {
    return await productModel.find();
  }
  static async getById(id) {
    return await productModel.findById(id);
  }
  static async add(product) {
    return await productModel.create(product);
  }
  static async update(id, product) {
    return await productModel.findByIdAndUpdate(id, product, { new: true });
  }
  static async delete(id) {
    return await productModel.findByIdAndDelete(id);
  }
  static async getByConditions(limit, page, sort, query) {
    const data = await productModel.paginate(query, { limit, page, sort });
    return data;
  }
  static async deleteAll() {
    return await productModel.deleteMany({});
  }
}

export default ProductDao;
