import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BookList from '../components/BookList';
import BookForm from '../components/BookForm';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // Verificar autenticación al cargar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Obtener datos del usuario (ejemplo)
    axios.get('http://localhost:3000/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => setUser(response.data))
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [navigate]);

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Agregar libro (ejemplo)
  const handleAddBook = (bookData) => {
    axios.post('http://localhost:3000/api/books', bookData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(() => setShowForm(false))
      .catch(error => alert(error.response?.data?.error || 'Error al crear libro'));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Bienvenido, {user?.email || 'Usuario'}
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Panel de acciones */}
        <div className="mb-6 space-x-4">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {showForm ? 'Cancelar' : 'Agregar Libro'}
          </button>
        </div>

        {/* Formulario de libro (condicional) */}
        {showForm && (
          <BookForm onSubmit={handleAddBook} />
        )}

        {/* Lista de libros */}
        <BookList isAdmin={user?.role === 'librarian'} />
      </div>
    </div>
  );
}