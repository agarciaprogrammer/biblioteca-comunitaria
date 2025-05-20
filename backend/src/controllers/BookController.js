const bookService = require('../services/bookService.js');

module.exports = {
  createBook: async (req, res) => {
    try {
      const { title, author } = req.body;
      const book = await bookService.createBook(title, author);
      res.status(201).json(book);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllBooks: async (req, res) => {
    try {
      const books = await bookService.getAllBooks();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener libros' });
    }
  },

  getBookById: async (req, res) => {
    try {
      const book = await bookService.getBookById(req.params.id);
      res.json(book);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  updateBook: async (req, res) => {
    try {
      const book = await bookService.updateBook(req.params.id, req.body);
      res.json(book);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteBook: async (req, res) => {
    try {
      const result = await bookService.deleteBook(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
};