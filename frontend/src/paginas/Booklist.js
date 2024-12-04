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

    // Fetch ejemplares from the backend with token authentication
    useEffect(() => {
        const fetchEjemplares = async () => {
            try {
                const token = localStorage.getItem("token"); // Get the token
                const response = await fetch("http://localhost:8094/ejemplar/disponibles", {
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
        fetchEjemplares();
    }, []);

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

    // Submit reservation
    const submitReservation = async () => {
        try {
            // Validate dates
            const start = new Date(startDate);
            const end = new Date(endDate);
            if (!startDate || !endDate || end - start > 7 * 24 * 60 * 60 * 1000) {
                alert("End date must not exceed 7 days from start date.");
                return;
            }
    
            const token = localStorage.getItem("token"); // Get the token
            const userId = localStorage.getItem("userId"); // Assume you store the user ID in localStorage
            if (!userId) {
                console.error("User ID not found in localStorage");
                alert("Please log in again.");
                return;
            }
    
            // Debug token and userId
            console.log("Token:", token);
            console.log("User ID:", userId);
    
            // Reservation payload
            const payload = {
                ejemplar: { id: selectedEjemplar.id },
                usuario: { id: parseInt(userId) },
                dateBorrowed: startDate,
                dateDue: endDate,
            };
    
            console.log("Payload:", payload); // Debug payload
    
            const response = await fetch("http://localhost:8094/transactions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`, // Include token
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
    
            console.log("Response status:", response.status); // Debug response status
    
            if (response.ok) {
                alert("Reservation successful!");
                closeModal();
                setEjemplares((prev) =>
                    prev.filter((book) => book.id !== selectedEjemplar.id)
                ); // Remove reserved book
            } else {
                const errorText = await response.text();
                console.error("Reservation failed:", errorText);
                alert("Reservation failed! " + errorText);
            }
        } catch (error) {
            console.error("Error reserving ejemplar:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="booklist">
            <h1>Available Copies ({ejemplares.length})</h1>
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
