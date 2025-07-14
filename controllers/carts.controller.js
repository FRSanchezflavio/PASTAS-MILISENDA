import { cartRepository } from '../repositories/cart.repository.js';
import { ticketService } from '../services/ticket.service.js';

export const getCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartRepository.getCartById(cid);
    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }

    res.render('cart', { cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity = 1 } = req.body;
    
    const updatedCart = await cartRepository.addProductToCart(cid, pid, quantity);
    if (!updatedCart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }
    
    res.json({ status: 'success', cart: updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
};

// DELETE /api/carts/:cid/products/:pid
export const deleteProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await cartRepository.deleteProductFromCart(cid, pid);
    if (!updatedCart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }
    res.json({ status: 'success', cart: updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
};

// PUT /api/carts/:cid
// Se recibe en el body: { "products": [ { product: "pid", quantity: X }, ... ] }
export const updateCartProducts = async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;

    if (!products || !Array.isArray(products)) {
      return res.status(400).json({
        status: 'error',
        message: 'El campo "products" debe ser un array de productos'
      });
    }

    const updated = await cartRepository.updateCart(cid, products);
    if (!updated) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }
    res.json({ status: 'success', cart: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
};

// PUT /api/carts/:cid/products/:pid
// Se recibe en el body: { "quantity": X }
export const updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (quantity == null) {
      return res.status(400).json({ status: 'error', message: 'Falta la cantidad' });
    }

    const updatedCart = await cartRepository.updateProductQuantity(cid, pid, quantity);
    if (!updatedCart) {
      return res.status(404).json({ status: 'error', message: 'Carrito o producto no encontrado' });
    }
    res.json({ status: 'success', cart: updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
};

// DELETE /api/carts/:cid
export const clearCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cleared = await cartRepository.clearCart(cid);
    if (!cleared) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }
    res.json({ status: 'success', cart: cleared });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
};

// POST /api/carts/:cid/purchase
export const purchaseCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const purchaserEmail = req.user.email;

    const result = await ticketService.processPurchase(cid, purchaserEmail);

    if (!result.success) {
      return res.status(400).json({
        status: 'error',
        message: result.message,
        productsNotProcessed: result.productsNotProcessed
      });
    }

    res.json({
      status: 'success',
      message: 'Compra procesada exitosamente',
      payload: {
        ticket: result.ticket,
        productsNotProcessed: result.productsNotProcessed,        totalAmount: result.totalAmount,
        processedProducts: result.processedProducts
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
};
