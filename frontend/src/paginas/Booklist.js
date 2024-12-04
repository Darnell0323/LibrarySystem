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

    const handleReserve = (ejemplar) => {
        setSelectedEjemplar(ejemplar);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedEjemplar(null);
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
                <div
                    className="modal-overlay"
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                >
                    <div
                        className="modal-content"
                        style={{
                            background: "white",
                            borderRadius: "10px",
                            padding: "20px",
                            width: "400px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        <h3>Reserve Book</h3>
                        <p>
                            Reserving <strong>Ejemplar ID: {selectedEjemplar?.id}</strong>
                        </p>
                        <label htmlFor="start-date" style={{ display: "block", marginTop: "10px" }}>
                            Start Date:
                        </label>
                        <input
                            type="date"
                            id="start-date"
                            style={{
                                width: "100%",
                                padding: "5px",
                                margin: "5px 0",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                            }}
                        />
                        <label htmlFor="end-date" style={{ display: "block", marginTop: "10px" }}>
                            End Date (max 7 days):
                        </label>
                        <input
                            type="date"
                            id="end-date"
                            style={{
                                width: "100%",
                                padding: "5px",
                                margin: "5px 0",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                            }}
                        />
                        <div
                            className="modal-buttons"
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginTop: "20px",
                            }}
                        >
                            <button
                                onClick={closeModal}
                                style={{
                                    background: "red",
                                    color: "white",
                                    padding: "10px 15px",
                                    marginRight: "10px",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    closeModal();
                                    alert("Reservation confirmed!");
                                }}
                                style={{
                                    background: "green",
                                    color: "white",
                                    padding: "10px 15px",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
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
