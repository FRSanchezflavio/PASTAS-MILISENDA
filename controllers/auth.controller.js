import { authService } from '../services/auth.service.js';
import { userRepository } from '../repositories/user.repository.js';

export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    if (!first_name || !last_name || !email || !age || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Todos los campos son requeridos'
      });
    }

    const user = await authService.register({
      first_name,
      last_name,
      email,
      age,
      password
    });

    res.status(201).json({
      status: 'success',
      message: 'Usuario registrado exitosamente',
      payload: user
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Email y contraseña son requeridos'
      });
    }

    const { user, token } = await authService.login(email, password);

    res.json({
      status: 'success',
      message: 'Login exitoso',
      payload: {
        user,
        token
      }
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      status: 'error',
      message: error.message
    });
  }
};

export const current = async (req, res) => {
  try {
    // El middleware ya verificó el token y cargó el usuario
    const currentUser = await userRepository.getUserCurrentById(req.user.id);
    
    res.json({
      status: 'success',
      payload: currentUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const logout = async (req, res) => {
  try {
    // En una implementación JWT, el logout se maneja del lado del cliente
    // eliminando el token del almacenamiento local
    res.json({
      status: 'success',
      message: 'Logout exitoso'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
