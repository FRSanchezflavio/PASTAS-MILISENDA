import Cart from '../models/cart.model.js';

export class CartDAO {
  async getCartById(cid) {
    return await Cart.findById(cid).populate('products.product');
  }

  async createCart() {
    return await Cart.create({ products: [] });
  }

  async updateCart(cid, productsArray) {
    return await Cart.findByIdAndUpdate(
      cid,
      { products: productsArray },
      { new: true }
    );
  }

  async clearCart(cid) {
    return await Cart.findByIdAndUpdate(
      cid,
      { products: [] },
      { new: true }
    );
  }

  async deleteProductFromCart(cid, pid) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== pid
    );
    await cart.save();
    return cart;
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    const productInCart = cart.products.find(
      (item) => item.product.toString() === pid
    );
    if (!productInCart) {
      cart.products.push({ product: pid, quantity });
    } else {
      productInCart.quantity = quantity;
    }

    await cart.save();
    return cart;
  }

  async addProductToCart(cid, pid, quantity = 1) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    const existingProduct = cart.products.find(
      (item) => item.product.toString() === pid
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: pid, quantity });
    }

    await cart.save();
    return cart;
  }
}

export const cartDAO = new CartDAO();
