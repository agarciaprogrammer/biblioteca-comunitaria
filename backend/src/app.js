require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const PORT = process.env.PORT || 3000;

const app = express();

// 1. Middlewares Globales
app.use(cors());          // Habilita CORS para todas las rutas
app.use(express.json());  // Parsea JSON en las requests

// 2. Rutas Principales
app.use('/api/auth', require('./routes/authRoutes.js'));  // Autenticación
app.use('/api/books', require('./routes/bookRoutes.js')); // Libros

// (Futuras rutas que puedas necesitar)
// app.use('/api/loans', require('./routes/loanRoutes'));  // Préstamos
// app.use('/api/users', require('./routes/userRoutes'));  // Usuarios

// 3. Manejo de Errores Global
app.use((err, req, res, next) => {  // Middleware de errores
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

// 4. Iniciar Servidor
db.then(() => {
  app.listen(PORT, () => console.log(`✅ Servidor en http://localhost:${PORT}`));
}).catch(err => {
  console.error('❌ Error al conectar a la DB:', err);
  process.exit(1);  // Detiene la app si hay error en la DB
});