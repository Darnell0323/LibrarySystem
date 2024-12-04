import { useState, useEffect } from "react";

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

        const filtered = books.filter(
            (book) =>
                book.titulo?.toLowerCase().includes(query) ||
                book.autor?.toLowerCase().includes(query)
        );
        setFilteredBooks(filtered);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-800 via-blue-900 to-black text-white">
            {/* Welcome Message */}
            <div className="flex flex-col items-center justify-center text-center py-16">
                <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-6">
                    Welcome to our Library System
                </h1>
                <p className="text-white">Find your favorite books below</p>
                {/* Search Bar */}
                <div className="relative w-full max-w-lg">
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full py-4 px-6 placeholder-gray-400 text-gray-900 bg-white border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Book Cards */}
            <div className="px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredBooks.map((book) => (
                    <div
                        key={book.id}
                        className="bg-white text-white rounded-lg shadow-lg p-4 flex flex-col items-center"
                    >
                        <img
                            src="https://via.placeholder.com/150"
                            alt={book.titulo || "No Title"}
                            className="mb-4 rounded-lg"
                        />
                        <h2 className="text-lg font-bold">{book.titulo || "No Title"}</h2>
                        <p className="text-sm">Author: {book.autor || "Unknown"}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Booklist;
