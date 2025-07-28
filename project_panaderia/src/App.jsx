import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserList from './users/UserList';
import UserForm from './users/UserForm';
import ProductsModule from './products';
import './users/users.css';
import axios from 'axios';

function App() {
    const [users, setUsers] = useState([]);
    const [userToEdit, setUserToEdit] = useState(null);

    useEffect(() => {
        // Obtener todos los usuarios al cargar la página
        axios.get('http://localhost:8000/api/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los usuarios', error);
            });
    }, []);

    const handleUserSubmit = (user) => {
    if (userToEdit) {
        // Actualizar un usuario
        axios.put(`http://localhost:8000/api/users/${userToEdit.id}`, user)
            .then(response => {
                // Obtener la lista actualizada de usuarios después de actualizar
                axios.get('http://localhost:8000/api/users')
                    .then(response => {
                        setUsers(response.data); // Actualizamos la lista de usuarios
                    })
                    .catch(error => {
                        console.error('Error al obtener los usuarios actualizados', error);
                    });

                setUserToEdit(null); // Limpiar el formulario después de editar
            })
            .catch(error => {
                console.error('Error al actualizar el usuario', error);
            });
    } else {
        // Crear un nuevo usuario
        axios.post('http://localhost:8000/api/users', user)
            .then(response => {
                // Obtener la lista actualizada de usuarios después de crear
                axios.get('http://localhost:8000/api/users')
                    .then(response => {
                        setUsers(response.data); // Actualizamos la lista de usuarios
                    })
                    .catch(error => {
                        console.error('Error al obtener los usuarios actualizados', error);
                    });
            })
            .catch(error => {
                console.error('Error al crear el usuario', error);
            });
    }
};


    return (
        <Router>
            <div className="min-h-screen bg-cream-50 text-gray-800 font-poppins">
                <div className="container mx-auto p-6 md:p-8">
                    <nav className="mb-8">
                        <ul className="flex justify-center space-x-6">
                            <li>
                                <Link to="/" className="text-lg font-bold text-amber-900">Gestionar Productos</Link>
                            </li>
                            <li>
                                <Link to="/users" className="text-lg font-bold text-amber-900">Gestionar Usuarios</Link>
                            </li>
                        </ul>
                    </nav>

                    <Routes>
                        <Route path="/" element={<><h1 className="text-3xl md:text-4xl font-bold text-center text-amber-900 mb-8 tracking-tight">🥖 Gestión de Productos de Panadería</h1><ProductsModule /></>} />
                        <Route path="/users" element={<><h1 className="text-3xl md:text-4xl font-bold text-center text-amber-900 mb-8 tracking-tight">🧑‍💼 Gestión de Usuarios</h1><UserForm user={userToEdit} onSubmit={handleUserSubmit} /><UserList users={users} setUserToEdit={setUserToEdit} /></>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
