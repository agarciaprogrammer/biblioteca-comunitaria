const { createConnection } = require('typeorm');
const { Book } = require('../models/Book.js');
const { User } = require('../models/User.js');

module.exports = createConnection({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Book, User],
  synchronize: true,  // ¡Solo para desarrollo!
  logging: true,
});