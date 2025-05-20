const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getRepository } = require('typeorm');
const User = require('../models/User.js');

module.exports = {
  async register(email, password) {
    const userRepository = getRepository(User);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({ email, password: hashedPassword });
    await userRepository.save(user);
    return user;
  },

  async login(email, password) {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Credenciales inválidas');
    }
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  },
};