import { useState } from 'react';
import axios from 'axios';
import { API_MONGO } from '../../config/api';

export default function AssignRole({ userId, onAssign }) {
  const [role, setRole] = useState('cliente');

  const handleAssignRole = async () => {
    try {
      console.log('ASSIGN ->', userId, role);
      await axios.put(`${API_MONGO}/users/${userId}/assign-role`, { role });
      onAssign?.();
    } catch (err) {
      console.error('ASSIGN error:', err.response?.data || err.message);
      alert('Error al asignar el rol');
    }
  };

  return (
    <span>
      <select value={role} onChange={e=>setRole(e.target.value)}>
        <option value="admin">Administrador</option>
        <option value="vendedor">Vendedor</option>
        <option value="cliente">Cliente</option>
      </select>
      <button onClick={handleAssignRole}>Asignar</button>
    </span>
  );
}
