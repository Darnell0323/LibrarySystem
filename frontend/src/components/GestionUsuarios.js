import React, { useState, useEffect  } from 'react';
import { Button } from './ui/button';
import { Table, TableHeader, TableBody, TableRow, TableCell } from './ui/table';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalTitle,
    ModalFooter,
} from './ui/modal';

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
        rol: 'usuario'
    });

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/usuario/listar');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            showAlert('Error al cargar usuarios', 'error');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const showAlert = (message, type) => {
        setAlert({ show: true, message, type });
        setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = currentUser
            ? 'http://localhost:8080/usuario/editar'
            : 'http://localhost:8080/usuario/nuevo';

        try {
            const response = await fetch(url, {
                method: currentUser ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentUser ? { ...formData, id: currentUser.id } : formData),
            });

            if (response.ok) {
                showAlert(currentUser ? 'Usuario actualizado exitosamente' : 'Usuario creado exitosamente', 'success');
                setShowModal(false);
                fetchUsers();
                resetForm();
            }
        } catch (error) {
            showAlert('Error al procesar la solicitud', 'error');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar este usuario?')) {
            try {
                const response = await fetch(`http://localhost:8080/usuario/eliminar/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    showAlert('Usuario eliminado exitosamente', 'success');
                    fetchUsers();
                }
            } catch (error) {
                showAlert('Error al eliminar usuario', 'error');
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
            rol: user.rol
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setFormData({
            nombre_usuario: '',
            email: '',
            telefono: '',
            password_hash: '',
            rol: 'usuario'
        });
        setCurrentUser(null);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
                <Button onClick={() => {
                    resetForm();
                    setShowModal(true);
                }}>
                    Nuevo Usuario
                </Button>
            </div>

            {alert.show && (
                <div className={`p-4 mb-4 rounded ${
                    alert.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                    {alert.message}
                </div>
            )}

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
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.nombre_usuario}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.telefono}</TableCell>
                                <TableCell>{user.rol}</TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit(user)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            Eliminar
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Modal open={showModal} onOpenChange={setShowModal}>
                <ModalContent>
                    <form onSubmit={handleSubmit}>
                        <ModalHeader>
                            <ModalTitle>
                                {currentUser ? 'Editar Usuario' : 'Nuevo Usuario'}
                            </ModalTitle>
                        </ModalHeader>

                        <div className="space-y-4 py-4">
                            <div className="grid gap-4 px-6">
                                <div className="grid gap-2">
                                    <label htmlFor="nombre_usuario" className="text-sm font-medium">
                                        Nombre
                                    </label>
                                    <input
                                        id="nombre_usuario"
                                        name="nombre_usuario"
                                        type="text"
                                        value={formData.nombre_usuario}
                                        onChange={handleInputChange}
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <label htmlFor="email" className="text-sm font-medium">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <label htmlFor="telefono" className="text-sm font-medium">
                                        Teléfono
                                    </label>
                                    <input
                                        id="telefono"
                                        name="telefono"
                                        type="tel"
                                        value={formData.telefono}
                                        onChange={handleInputChange}
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <label htmlFor="password_hash" className="text-sm font-medium">
                                        Contraseña
                                    </label>
                                    <input
                                        id="password_hash"
                                        name="password_hash"
                                        type="password"
                                        value={formData.password_hash}
                                        onChange={handleInputChange}
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                                        required={!currentUser}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <label htmlFor="rol" className="text-sm font-medium">
                                        Rol
                                    </label>
                                    <select
                                        id="rol"
                                        name="rol"
                                        value={formData.rol}
                                        onChange={handleInputChange}
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                                        required
                                    >
                                        <option value="usuario">Usuario</option>
                                        <option value="administrador">Administrador</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <ModalFooter>
                            <Button variant="outline" type="button" onClick={() => setShowModal(false)}>
                                Cancelar
                            </Button>
                            <Button type="submit">
                                {currentUser ? 'Actualizar' : 'Crear'}
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default GestionUsuarios;