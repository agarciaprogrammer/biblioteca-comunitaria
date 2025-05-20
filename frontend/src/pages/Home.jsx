import BookList from '../components/BookList.jsx';

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold p-4">Libros Disponibles</h1>
      <BookList />
    </div>
  );
}