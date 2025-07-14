import { Router } from 'express';
import {
  getCart,
  addProductToCart,
  deleteProductFromCart,
  updateCartProducts,
  updateProductQuantity,
  clearCart,
  purchaseCart
} from '../controllers/carts.controller.js';
import { requireUser, requireAuth } from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas para ver carrito (cualquier usuario autenticado)
router.get('/:cid', requireAuth, getCart);

// Rutas para usuarios (agregar productos al carrito)
router.post('/:cid/product/:pid', requireUser, addProductToCart);
router.put('/:cid/products/:pid', requireUser, updateProductQuantity);
router.put('/:cid', requireUser, updateCartProducts);
router.delete('/:cid/products/:pid', requireUser, deleteProductFromCart);
router.delete('/:cid', requireUser, clearCart);

// Ruta para finalizar compra (solo usuarios)
router.post('/:cid/purchase', requireUser, purchaseCart);

export default router;
