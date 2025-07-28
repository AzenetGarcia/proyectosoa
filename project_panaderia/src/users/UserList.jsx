import React, { useState } from 'react';
import axios from 'axios';

const UserList = ({ users, setUserToEdit }) => {

    const handleDelete = (id) => {
    // Eliminar el usuario de la base de datos
    axios.delete(`http://localhost:8000/api/users/${id}`)
        .then(response => {
            console.log('Usuario eliminado:', response.data);
            // Obtener la lista actualizada de usuarios después de eliminar
            axios.get('http://localhost:8000/api/users')
                .then(response => {
                    setUsers(response.data); // Actualizamos la lista de usuarios
                })
                .catch(error => {
                    console.error('Error al obtener los usuarios actualizados', error);
                });
        })
        .catch(error => console.error('Error al eliminar el usuario', error));
};


    return (
        <div>
            <h3>Lista de Usuarios</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => setUserToEdit(user)}>Edit</button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
