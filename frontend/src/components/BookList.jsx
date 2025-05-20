import { useEffect, useState } from 'react';
import axios from 'axios';

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {books.map(book => (
        <div key={book.id} className="border p-4 rounded-lg shadow">
          <h3 className="font-bold">{book.title}</h3>
          <p className="text-gray-600">{book.author}</p>
          <p className={`text-sm ${
            book.status === 'available' ? 'text-green-500' : 'text-red-500'
          }`}>
            {book.status}
          </p>
        </div>
      ))}
    </div>
  );
}