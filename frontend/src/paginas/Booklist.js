import { useEffect, useState } from "react";
import "../styles/Booklist.css";
import "../styles/userlist.css";
import { useNavigate, useLocation } from "react-router-dom";

const Booklist = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [ejemplares, setEjemplares] = useState([]);
    const [showModal, setShowModal] = useState(false); // Modal state
    const [selectedEjemplar, setSelectedEjemplar] = useState(null); // Selected ejemplar
    const [startDate, setStartDate] = useState(""); // Start date
    const [endDate, setEndDate] = useState(""); // End date
    const [searchParams, setSearchParams] = useState({
        title: "",
        author: "",
        category: "",
    }); // Search parameters

    // Fetch ejemplares from the backend with token authentication
    const fetchEjemplares = async (filters = {}) => {
        try {
            const token = localStorage.getItem("token"); // Get the token
            const queryParams = new URLSearchParams(filters).toString();
            const response = await fetch(`http://localhost:8094/libro/search?${queryParams}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`, // Include token
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setEjemplares(data); // Update state with fetched data
        } catch (error) {
            console.error("Error fetching ejemplares:", error);
        }
    };

    useEffect(() => {
        fetchEjemplares();
    }, []);

    // Handle search input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prev) => ({ ...prev, [name]: value }));
    };

    // Handle search form submission
    const handleSearch = (e) => {
        e.preventDefault();
        fetchEjemplares(searchParams);
    };

    // Handle reserve button
    const handleReserve = (ejemplar) => {
        setSelectedEjemplar(ejemplar);
        setShowModal(true);
    };

    // Close modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedEjemplar(null);
        setStartDate("");
        setEndDate("");
    };

    // Submit reservation (same as your existing implementation)
    const submitReservation = async () => {
        // Logic for reservation (same as before)
    };

    return (
        <div className="booklist">
            <h1>Available Copies ({ejemplares.length})</h1>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="search-bar">
                <input
                    type="text"
                    name="title"
                    placeholder="Search by Title"
                    value={searchParams.title}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Search by Author"
                    value={searchParams.author}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Search by Category"
                    value={searchParams.category}
                    onChange={handleInputChange}
                />
                <button type="submit">Search</button>
            </form>

            <div className="section">
                {ejemplares.map((ejemplar) => (
                    <div className="bookcard" key={ejemplar.id}>
                        <h2>
                            <strong>Ejemplar ID: {ejemplar.id}</strong>
                        </h2>
                        <p>
                            <span>Book ID: </span> {ejemplar.libroId}
                        </p>
                        <p>
                            <span>Edition: </span> {ejemplar.edicion}
                        </p>
                        <p>
                            <span>Publisher: </span> {ejemplar.publicador}
                        </p>
                        <p>
                            <span>Year Published: </span> {ejemplar.anioPublicacion}
                        </p>
                        <p>
                            <span>Available: </span> {ejemplar.disponible ? "Yes" : "No"}
                        </p>
                        <button
                            title="Reserve Now"
                            onClick={() => handleReserve(ejemplar)}
                            className="booklistbtn"
                        >
                            Reserve Now
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Reserve Book</h3>
                        <p>
                            Reserving <strong>Ejemplar ID: {selectedEjemplar?.id}</strong>
                        </p>
                        <label htmlFor="start-date">Start Date:</label>
                        <input
                            type="date"
                            id="start-date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <label htmlFor="end-date">End Date (max 7 days):</label>
                        <input
                            type="date"
                            id="end-date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <div className="modal-buttons">
                            <button onClick={closeModal} className="cancel-btn">
                                Cancel
                            </button>
                            <button onClick={submitReservation} className="reserve-btn">
                                Reserve
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Booklist;
