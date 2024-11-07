import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${query}`);
      const data = await response.json();
      setBooks(data.docs);
    } catch (error) {
      console.error("Failed to fetch books", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-purple-200 to-indigo-300 flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10">📚 Book Finder</h1>

      <form onSubmit={searchBooks} className="flex w-full max-w-lg mb-12">
        <input
          type="text"
          placeholder="Search for books by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="p-3 bg-indigo-500 text-white rounded-r-lg font-semibold hover:bg-indigo-600 transition-transform transform hover:scale-105"
        >
          🔍 Search
        </button>
      </form>

      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-t-indigo-500 border-indigo-300 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
          {books.map((book) => (
            <div
              key={book.key}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform transition-transform hover:-translate-y-1"
            >
              {book.cover_i ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                  alt={book.title}
                  className="w-full h-60 object-cover rounded-md mb-4"
                />
              ) : (
                <div className="w-full h-60 bg-gray-200 flex items-center justify-center rounded-md mb-4">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
              <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
              <p className="text-gray-600 mt-2">Author: {book.author_name?.join(', ') || 'N/A'}</p>
              <p className="text-gray-600">Year: {book.first_publish_year || 'N/A'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
