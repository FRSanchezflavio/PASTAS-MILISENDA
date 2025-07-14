import { productDAO } from '../dao/product.dao.js';
import { ProductDTO } from '../dto/product.dto.js';

export class ProductRepository {
  constructor() {
    this.dao = productDAO;
  }

  async getProducts(params) {
    const result = await this.dao.getProducts(params);
    return {
      ...result,
      docs: result.docs.map(product => new ProductDTO(product))
    };
  }

  async getProductById(id) {
    const product = await this.dao.getProductById(id);
    return product ? new ProductDTO(product) : null;
  }

  async createProduct(productData) {
    const product = await this.dao.create(productData);
    return new ProductDTO(product);
  }

  async updateProduct(id, productData) {
    const product = await this.dao.update(id, productData);
    return product ? new ProductDTO(product) : null;
  }

  async deleteProduct(id) {
    return await this.dao.delete(id);
  }

  async updateStock(id, newStock) {
    const product = await this.dao.updateStock(id, newStock);
    return product ? new ProductDTO(product) : null;
  }
}

export const productRepository = new ProductRepository();
