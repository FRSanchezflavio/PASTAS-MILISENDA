import { Router } from 'express';
import { register, login, current, logout } from '../controllers/auth.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/current', requireAuth, current);
router.post('/logout', logout);

export default router;
