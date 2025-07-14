import Product from '../models/product.model.js';

export class ProductDAO {
  async getProducts({ limit, page, sort, query }) {
    let filter = {};
    if (query) {
      filter = { category: { $regex: query, $options: 'i' } };
    }

    const options = {
      limit: limit || 10,
      page: page || 1,
      sort: {}
    };

    if (sort === 'asc') options.sort = { price: 1 };
    if (sort === 'desc') options.sort = { price: -1 };

    return await Product.paginate(filter, options);
  }

  async getProductById(id) {
    return await Product.findById(id);
  }

  async create(productData) {
    return await Product.create(productData);
  }

  async update(id, productData) {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }

  async updateStock(id, newStock) {
    return await Product.findByIdAndUpdate(id, { stock: newStock }, { new: true });
  }
}

export const productDAO = new ProductDAO();
