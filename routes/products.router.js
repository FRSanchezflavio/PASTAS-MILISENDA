import { Router } from 'express';
import {
  getAllProducts,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/products.controller.js';
import { requireAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas públicas (lectura)
router.get('/', getAllProducts);
router.get('/:pid', getProductDetail);

// Rutas protegidas para administradores
router.post('/', requireAdmin, createProduct);
router.put('/:pid', requireAdmin, updateProduct);
router.delete('/:pid', requireAdmin, deleteProduct);

export default router;
