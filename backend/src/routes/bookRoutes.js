const express = require('express');
const router = express.Router();
const bookController = require('../controllers/BookController.js');
const authMiddleware = require('../../middleware/auth.js'); // Middleware de autenticación

// Rutas públicas
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

// Rutas protegidas (solo bibliotecarios)
router.post('/', authMiddleware, bookController.createBook);
router.put('/:id', authMiddleware, bookController.updateBook);
router.delete('/:id', authMiddleware, bookController.deleteBook);

module.exports = router;