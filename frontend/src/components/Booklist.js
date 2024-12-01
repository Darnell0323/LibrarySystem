import { useEffect, useState } from "react";

const Booklist = () => {
  let [books, setBooks] = useState([]);
  let [searchQuery, setSearchQuery] = useState("");
  let [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch("http://localhost:8094/libro/disponibles");
      let data = await response.json();
      setBooks(data);
      setFilteredBooks(data);
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = books.filter((book) =>
      book.titulo?.toLowerCase().includes(query) ||
      book.autor?.toLowerCase().includes(query)
    );

    setFilteredBooks(filtered);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="relative flex flex-wrap items-center justify-between px-4 py-3 bg-blue-500 mb-5">
        <div className="container mx-auto flex justify-between">
          <a
            className="text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
            href="#"
          >
            Library System
          </a>
        </div>
      </nav>

      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <div className="relative flex w-full flex-wrap items-stretch mb-5">
          <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-lg items-center justify-center w-8 pl-3 py-3">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={handleSearch}
            className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"
          />
        </div>

        {/* Book List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              className="bg-white rounded shadow-md p-5"
              key={book.id}
            >
              <img
                src="https://via.placeholder.com/150"
                alt="Book"
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {book.titulo || "No Title Available"}
              </h3>
              <p className="text-gray-600">
                <strong>Author:</strong> {book.autor || "Unknown"}
              </p>
              <p className="text-gray-600">
                <strong>Category ID:</strong> {book.categoria_id || "N/A"}
              </p>
              <p className="text-gray-600">
                <strong>Publication Date:</strong>{" "}
                {book.fecha_publicacion || "N/A"}
              </p>
              <p className="text-gray-600">
                <strong>Availability:</strong>{" "}
                {book.disponible ? "Available" : "Not Available"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Booklist;
