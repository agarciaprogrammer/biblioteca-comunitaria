const { getRepository } = require('typeorm');
const Book = require('../models/Book.js');

module.exports = {
  // Crear un libro
  async createBook(title, author) {
    const bookRepository = getRepository(Book);
    const book = bookRepository.create({ title, author });
    await bookRepository.save(book);
    return book;
  },

  // Obtener todos los libros
  async getAllBooks() {
    const bookRepository = getRepository(Book);
    return await bookRepository.find();
  },

  // Obtener libro por ID
  async getBookById(id) {
    const bookRepository = getRepository(Book);
    const book = await bookRepository.findOne({ where: { id } });
    if (!book) throw new Error('Libro no encontrado');
    return book;
  },

  // Actualizar libro
  async updateBook(id, updates) {
    const bookRepository = getRepository(Book);
    await bookRepository.update(id, updates);
    return await bookRepository.findOne({ where: { id } });
  },

  // Eliminar libro
  async deleteBook(id) {
    const bookRepository = getRepository(Book);
    const result = await bookRepository.delete(id);
    if (result.affected === 0) throw new Error('Libro no encontrado');
    return { message: 'Libro eliminado' };
  },
};