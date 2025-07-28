import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ user, onSubmit }) => {
    const [name, setName] = useState(user ? user.name : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState(''); // Confirmación de contraseña
    const [role, setRole] = useState(user ? user.role : 'customer');

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { name, email, password, password_confirmation: passwordConfirmation, role };

        // Enviar los datos a la API
        if (user) {
            axios.put(`http://localhost:8000/api/users/${user.id}`, userData)
                .then(response => {
                    onSubmit(response.data); // Actualizamos la lista de usuarios
                })
                .catch(error => console.error('Error al actualizar el usuario', error));
        } else {
            axios.post('http://localhost:8000/api/users', userData)
                .then(response => {
                    onSubmit(response.data); // Actualizamos la lista de usuarios
                })
                .catch(error => console.error('Error al crear el usuario', error));
        }
    };

    return (
        <div>
            <h2>{user ? 'Editar Usuario' : 'Crear Usuario'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    required
                />
                <input
                    type="password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    placeholder="Confirmar Contraseña"
                    required
                />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="customer">Cliente</option>
                    <option value="vendedor">Vendedor</option>
                    <option value="admin">Administrador</option>
                </select>
                <button type="submit">{user ? 'Actualizar' : 'Crear'}</button>
            </form>
        </div>
    );
};

export default UserForm;
