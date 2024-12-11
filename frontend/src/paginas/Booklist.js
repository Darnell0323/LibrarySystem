import { useEffect, useState } from "react";
//import "../styles/Booklist.css";
//import "../styles/userlist.css";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";

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
    /*const fetchEjemplares = async (filters = {}) => {
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
                console.log(response);
                console.log(`Error: ${response.status}`);
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setEjemplares(data); // Update state with fetched data
        } catch (error) {
            console.error("Error fetching ejemplares:", error);
        }
    };*/
    const fetchEjemplares = async (filters = {}) => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await axiosInstance.get('http://localhost:8094/ejemplar/listar');
            if (response.status === 200) {
                setEjemplares(response.data);
                console.log(response.data);// Actualiza el estado con los datos obtenidos
            } else {
                console.error(`Error: ${response.status}`);
            }
        } catch (error) {
            console.error('Error al obtener libros:', error);
            if (error.response) {
                console.error('Respuesta del servidor:', error.response.data);
            }
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
        <div className="booklist p-6 bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">
                Available Copies ({ejemplares.length})
            </h1>
            <div className="section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ejemplares.map((ejemplar) => (
                    <div
                        className="bookcard p-4 bg-white border border-gray-200 rounded-lg shadow-md"
                        key={ejemplar.id}
                    >
                        <h2 className="text-lg font-semibold mb-2">
                            <strong>Ejemplar ID: {ejemplar.id}</strong>
                        </h2>
                        <p className="text-gray-700">
                            <span className="font-semibold">Book Name:</span> {ejemplar.titulo}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Edition:</span> {ejemplar.edicion}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Publisher:</span> {ejemplar.editorial}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Year Published:</span> {ejemplar.anio}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Available:</span> {ejemplar.disponible ? "Yes" : "No"}
                        </p>
                        <button
                            title="Reserve Now"
                            onClick={() => handleReserve(ejemplar)}
                            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                        >
                            Reserve Now
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="modal-content bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-xl font-bold mb-4">Reserve Book</h3>
                        <p className="text-gray-700 mb-4">
                            Reserving <strong>Ejemplar ID: {selectedEjemplar?.id}</strong>
                        </p>
                        <label htmlFor="start-date" className="block text-sm font-medium mb-1">
                            Start Date:
                        </label>
                        <input
                            type="date"
                            id="start-date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        />
                        <label htmlFor="end-date" className="block text-sm font-medium mb-1">
                            End Date (max 7 days):
                        </label>
                        <input
                            type="date"
                            id="end-date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        />
                        <div className="modal-buttons flex justify-end gap-4">
                            <button
                                onClick={closeModal}
                                className="cancel-btn bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitReservation}
                                className="reserve-btn bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
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
/*
<form
    onSubmit={handleSearch}
    className="search-bar flex flex-col md:flex-row gap-4 mb-6"
>
    <input
        type="text"
        name="title"
        placeholder="Search by Title"
        value={searchParams.title}
        onChange={handleInputChange}
        className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md"
    />
    <input
        type="text"
        name="author"
        placeholder="Search by Author"
        value={searchParams.author}
        onChange={handleInputChange}
        className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md"
    />
    <input
        type="text"
        name="category"
        placeholder="Search by Category"
        value={searchParams.category}
        onChange={handleInputChange}
        className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md"
    />
    <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
    >
        Search
    </button>
</form>*/