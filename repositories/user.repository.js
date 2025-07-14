import { UserDAO } from '../dao/user.dao.js';
import { UserDTO, UserCurrentDTO } from '../dto/user.dto.js';

export class UserRepository {
  constructor() {
    this.dao = new UserDAO();
  }

  async createUser(userData) {
    const user = await this.dao.create(userData);
    return new UserDTO(user);
  }

  async getUserById(id) {
    const user = await this.dao.findById(id);
    return user ? new UserDTO(user) : null;
  }

  async getUserByEmail(email) {
    const user = await this.dao.findByEmail(email);
    return user ? new UserDTO(user) : null;
  }

  async getUserCurrentById(id) {
    const user = await this.dao.findById(id);
    return user ? new UserCurrentDTO(user) : null;
  }

  async updateUser(id, userData) {
    const user = await this.dao.update(id, userData);
    return user ? new UserDTO(user) : null;
  }

  async deleteUser(id) {
    return await this.dao.delete(id);
  }

  async getAllUsers() {
    const users = await this.dao.findAll();
    return users.map(user => new UserDTO(user));
  }
}

export const userRepository = new UserRepository();
