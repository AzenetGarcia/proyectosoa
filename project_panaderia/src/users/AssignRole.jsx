import React, { useState } from 'react';
import axios from 'axios';

const AssignRole = ({ userId, onAssign }) => {
    const [role, setRole] = useState('customer');

    const handleAssignRole = () => {
        axios.put(`http://localhost:8000/api/users/${userId}/assign-role`, { role })
            .then(response => {
                onAssign(response.data);
            })
            .catch(error => {
                console.error('Error al asignar el rol', error);
            });
    };

    return (
        <div>
            <h3>Asignar Rol</h3>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="admin">Administrador</option>
                <option value="vendedor">Vendedor</option>
                <option value="customer">Cliente</option>
            </select>
            <button onClick={handleAssignRole}>Asignar</button>
        </div>
    );
};

export default AssignRole;
