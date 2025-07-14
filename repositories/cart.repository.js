import { cartDAO } from '../dao/cart.dao.js';

export class CartRepository {
  constructor() {
    this.dao = cartDAO;
  }

  async getCartById(cid) {
    return await this.dao.getCartById(cid);
  }

  async createCart() {
    return await this.dao.createCart();
  }

  async updateCart(cid, productsArray) {
    return await this.dao.updateCart(cid, productsArray);
  }

  async clearCart(cid) {
    return await this.dao.clearCart(cid);
  }

  async deleteProductFromCart(cid, pid) {
    return await this.dao.deleteProductFromCart(cid, pid);
  }

  async updateProductQuantity(cid, pid, quantity) {
    return await this.dao.updateProductQuantity(cid, pid, quantity);
  }

  async addProductToCart(cid, pid, quantity = 1) {
    return await this.dao.addProductToCart(cid, pid, quantity);
  }
}

export const cartRepository = new CartRepository();
