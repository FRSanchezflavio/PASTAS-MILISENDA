import { ticketRepository } from '../repositories/ticket.repository.js';
import { productRepository } from '../repositories/product.repository.js';
import { cartRepository } from '../repositories/cart.repository.js';

export class TicketService {
  async processPurchase(cartId, purchaserEmail) {
    try {
      const cart = await cartRepository.getCartById(cartId);
      if (!cart || cart.products.length === 0) {
        throw new Error('Carrito vacío o no encontrado');
      }

      const productsToProcess = [];
      const productsNotProcessed = [];
      let totalAmount = 0;

      for (const item of cart.products) {
        const product = await productRepository.getProductById(item.product._id);
        
        if (!product) {
          productsNotProcessed.push(item.product._id);
          continue;
        }

        if (product.stock >= item.quantity) {
          productsToProcess.push({
            product,
            quantity: item.quantity,
            subtotal: product.price * item.quantity
          });
          totalAmount += product.price * item.quantity;
        } else {
          productsNotProcessed.push(item.product._id);
        }
      }

      if (productsToProcess.length === 0) {
        return {
          success: false,
          message: 'No hay productos con stock suficiente',
          productsNotProcessed: productsNotProcessed.map(id => id.toString())
        };
      }

      for (const item of productsToProcess) {
        const newStock = item.product.stock - item.quantity;
        await productRepository.updateStock(item.product.id, newStock);
      }

      const ticket = await ticketRepository.createTicket({
        amount: totalAmount,
        purchaser: purchaserEmail
      });

      const remainingProducts = cart.products.filter(item => 
        productsNotProcessed.includes(item.product._id.toString())
      );
      
      await cartRepository.updateCart(cartId, remainingProducts);

      return {
        success: true,
        ticket,
        productsNotProcessed: productsNotProcessed.map(id => id.toString()),
        totalAmount,
        processedProducts: productsToProcess.length
      };

    } catch (error) {
      throw new Error(`Error al procesar la compra: ${error.message}`);
    }
  }
}

export const ticketService = new TicketService();
