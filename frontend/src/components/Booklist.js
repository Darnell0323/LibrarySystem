import { useEffect, useState } from "react"; 
import '../styles/userlist.css';

const Booklist = () => {
    let [books, setBooks] = useState([]);
    let [searchQuery, setSearchQuery] = useState('');
    let [filteredBooks, setFilteredBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let response = await fetch('http://localhost:8094/libro/disponibles');
            let data = await response.json();
            console.log(data); // Log data to inspect structure
            setBooks(data);
            setFilteredBooks(data);
        }
        fetchData();
    }, []);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = books.filter(book =>
            book.titulo?.toLowerCase().includes(query) ||
            book.autor?.toLowerCase().includes(query)
        );

        setFilteredBooks(filtered);
    };

    return (
        <div className="booklist">
            <div className="main addmain">
                <h1>Available Books ({filteredBooks.length})</h1>
                
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
                
                <div className="section">
                    {filteredBooks.map(book => (
                        <div className="bookcard" key={book.id}>
                            <div className="bookimage">
                                {/* Since there's no image, we can use a placeholder */}
                                <img 
                                    src='https://via.placeholder.com/100' 
                                    title={book.titulo || 'No Title'} 
                                    alt={book.titulo || 'No Title'} 
                                />
                            </div>
                            <div className="bookcardinfo">
                                <div className="bookscardinfo-no-btns">
                                    <div>
                                        <h2 title={book.titulo}><strong>{book.titulo || 'No Title Available'}</strong></h2>
                                    </div>
                                    <div>
                                        <p><span>Author: </span> {book.autor || 'Unknown'}</p>
                                    </div>
                                    <div>
                                        <p><span>Category ID: </span> {book.categoria_id || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p><span>Publication Date: </span> {book.fecha_publicacion || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p><span>Availability: </span> {book.disponible ? 'Available' : 'Not Available'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Booklist;