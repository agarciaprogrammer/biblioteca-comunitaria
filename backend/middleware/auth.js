const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Acceso denegado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'librarian') throw new Error('Sin permisos');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};