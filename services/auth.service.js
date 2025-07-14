import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/user.repository.js';
import { cartRepository } from '../repositories/cart.repository.js';

export class AuthService {
  async register(userData) {
    const existingUser = await userRepository.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('El usuario ya existe');
    }

    const cart = await cartRepository.createCart();
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const role = userData.email === process.env.ADMIN_EMAIL ? 'admin' : 'user';
    
    const newUser = await userRepository.createUser({
      ...userData,
      password: hashedPassword,
      cart: cart._id,
      role
    });

    return newUser;
  }

  async login(email, password) {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas');
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role,
        cart: user.cart 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    return { user, token };
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }
}

export const authService = new AuthService();
