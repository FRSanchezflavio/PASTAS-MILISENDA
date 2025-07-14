import User from '../models/user.model.js';

export class UserDAO {
  async create(userData) {
    return await User.create(userData);
  }

  async findById(id) {
    return await User.findById(id).populate('cart');
  }

  async findByEmail(email) {
    return await User.findOne({ email }).populate('cart');
  }

  async findAll() {
    return await User.find().populate('cart');
  }

  async update(id, userData) {
    return await User.findByIdAndUpdate(id, userData, { new: true });
  }

  async delete(id) {
    return await User.findByIdAndDelete(id);
  }
}
