import { authService } from '../services/auth.service.js';
import { userRepository } from '../repositories/user.repository.js';

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        status: 'error', 
        message: 'Token requerido' 
      });
    }

    const decoded = authService.verifyToken(token);
    const user = await userRepository.getUserById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ 
        status: 'error', 
        message: 'Usuario no encontrado' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ 
      status: 'error', 
      message: 'Token inválido' 
    });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        status: 'error', 
        message: 'No autenticado' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        status: 'error', 
        message: 'Sin permisos' 
      });
    }

    next();
  };
};

export const requireAdmin = [authenticateToken, authorizeRoles('admin')];
export const requireUser = [authenticateToken, authorizeRoles('user')];
export const requireAuth = [authenticateToken];
