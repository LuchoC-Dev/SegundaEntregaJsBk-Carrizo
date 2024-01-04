import productModel from '../models/product.model.js';

class ProductDao {
  static productRandom(count) {
    return {
      title: 'Titulo de prueba',
      description: 'Descripcion de prueba',
      price: 10 + count / 10,
      thumbnail: ['imagenDePrueba.jpg'],
      code: `ABC${count + 1}`,
      stock: 50,
      status: true,
      category: 'prueba',
    };
  }

  static async getAll() {
    return await productModel.find();
  }
  static async get(id) {
    return await productModel.findById(id);
  }
  static async add(product) {
    return await productModel.create(product);
  }
  static async create() {
    const count = await productModel.countDocuments();
    return await productModel.create(this.productRandom(count));
  }
  static async createMany(quantity) {
    const products = [];
    const count = await productModel.countDocuments();
    for (let index = 0; index < quantity; index++) {
      products.push(
        await productModel.create(this.productRandom(count + index)),
      );
    }
    return products;
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
  static async clear() {
    return await productModel.deleteMany({});
  }
}

export default ProductDao;
