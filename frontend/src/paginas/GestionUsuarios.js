import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/ui/table';
import axiosInstance from "../api/axiosConfig";

const GestionUsuarios = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    const [formData, setFormData] = useState({
        nombre_usuario: '',
        email: '',
        telefono: '',
        password_hash: '',
        id_rol: 0
    });

    // Fetch para obtener la lista de usuarios
    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get('/usuario/listar');
            if (response.status === 200) {
                setUsers(response.data); // Actualiza el estado con los datos obtenidos
            } else {
                console.error(`Error: ${response.status}`);
            }
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            if (error.response) {
                console.error('Respuesta del servidor:', error.response.data);
            }
        }
    };

    // Ejecuta fetchUsers al montar el componente
    useEffect(() => {
        fetchUsers(); // Llama a fetchUsers y actualiza el estado
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: name === 'id_rol' ? Number(value) : value, // Convierte a número solo si el campo es id_rol
        });
    };


    const showAlert = (message, type) => {
        setAlert({ show: true, message, type });
        setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = currentUser ? '/usuario/editar' : '/usuario/nuevo';

        try {
            const response = await axiosInstance({
                method: currentUser ? 'PUT' : 'POST',
                url,
                data: currentUser ? { ...formData, id: currentUser.id } : formData,
            });

            if (response.status === 200 || response.status === 201) {
                showAlert(currentUser ? 'Usuario actualizado exitosamente' : 'Usuario creado exitosamente', 'success');
                setShowModal(false);
                await fetchUsers(); // Actualiza la lista después de crear o editar un usuario
                resetForm();
            }
        } catch (error) {
            showAlert('Error al procesar la solicitud', 'error');
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar este usuario?')) {
            try {
                const response = await axiosInstance.delete(`/usuario/eliminar/${id}`);
                if (response.status === 200) {
                    showAlert('Usuario eliminado exitosamente', 'success');
                    fetchUsers(); // Actualiza la lista después de eliminar un usuario
                }
            } catch (error) {
                showAlert('Error al eliminar usuario', 'error');
                console.error(error);
            }
        }
    };

    const handleEdit = (user) => {
        setCurrentUser(user);
        setFormData({
            nombre_usuario: user.nombre_usuario,
            email: user.email,
            telefono: user.telefono,
            password_hash: '',
            id_rol: user.id_rol
        });
        setShowModal(true);
    };
    const resetForm = () => {
        setFormData({
            nombre_usuario: '',
            email: '',
            telefono: '',
            password_hash: '',
            id_rol: null
        });
        setCurrentUser(null);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto mt-16">
            <div className="flex justify-between items-center mb-6 mt-10">
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>

                {/* Botón para abrir el modal */}
                <Button onClick={() => {setShowModal(true); setCurrentUser(false);resetForm()}}>Nuevo Usuario</Button>
            </div>

            {alert.show && (
                <div className={`p-4 mb-4 rounded ${
                    alert.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                    {alert.message}
                </div>
            )}

            {/* Tabla de usuarios */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell className="font-medium">ID</TableCell>
                            <TableCell className="font-medium">Nombre</TableCell>
                            <TableCell className="font-medium">Email</TableCell>
                            <TableCell className="font-medium">Teléfono</TableCell>
                            <TableCell className="font-medium">Rol</TableCell>
                            <TableCell className="font-medium">Acciones</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.nombre_usuario}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.telefono}</TableCell>
                                <TableCell>{user.id_rol}</TableCell>
                                <TableCell>
                                    <Button onClick={() => {handleEdit(user);setCurrentUser(true)}}>Editar</Button>
                                    <Button onClick={() => handleDelete(user.id)} variant="destructive">
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center animate-fadeIn"
                    style={{display: "flex", justifyContent: "center", alignItems: "center"}}
                >
                    <div
                        className="modal-content bg-white p-6 rounded-lg shadow-lg max-w-lg w-full space-y-6 animate-fadeIn"
                        style={{
                            width: "400px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            animation: "fadeIn 0.3s ease-out",
                        }}
                    >
                        <h2 className="text-xl font-semibold text-center">{currentUser ? 'Actualizar Usuario' : 'Crear Nuevo Usuario'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div className="grid gap-4 px-6">
                                    <div className="grid gap-2">
                                        <label htmlFor="nombre_usuario" className="my-4 text-blueGray-500 text-lg leading-relaxed">Nombre</label>
                                        <input
                                            id="nombre_usuario"
                                            name="nombre_usuario"
                                            type="text"
                                            value={formData.nombre_usuario}
                                            onChange={handleInputChange}
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor="email" className="my-4 text-blueGray-500 text-lg leading-relaxed">Email</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor="telefono" className="my-4 text-blueGray-500 text-lg leading-relaxed">Teléfono</label>
                                        <input
                                            id="telefono"
                                            name="telefono"
                                            type="tel"
                                            value={formData.telefono}
                                            onChange={handleInputChange}
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor="password_hash"
                                               className="my-4 text-blueGray-500 text-lg leading-relaxed">Contraseña</label>
                                        <input
                                            id="password_hash"
                                            name="password_hash"
                                            type="password"
                                            value={formData.password_hash}
                                            onChange={handleInputChange}
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor={`rol_${currentUser ? currentUser.id : ''}`}
                                               className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                            Rol
                                        </label>
                                        <select
                                            id={`rol_${currentUser ? currentUser.id : ''}`}
                                            name="rol"
                                            value={formData.id_rol}
                                            onChange={handleInputChange}
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                                            required
                                        >
                                            <option value="2">Usuario</option>
                                     
                                            <option value="1">bibliotecario</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-2 mt-4">
                                <Button variant="destructive" type="button" onClick={() => setShowModal(false)}>
                                    Cancelar
                                </Button>
                                <Button type="submit">{currentUser ? 'Actualizar' : 'Crear'}</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>

    );
};

export default GestionUsuarios;
