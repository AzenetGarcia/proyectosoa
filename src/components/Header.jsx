// src/components/Header.jsx
import { NavLink } from 'react-router-dom';
import { useAuth } from '../modules/auth/AuthContext';

export default function Header() {
  const { user, role, logout } = useAuth();

  if (!user) return null;

  return (
    <header className="bg-white/80 border-b border-cream-100">
      <div className="container mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-amber-900 tracking-tight">
          🥖 Panel de Administración
        </h1>
        <nav className="flex items-center gap-4">
          <NavItem to="/productos" label="Productos" />
          
          {role === "admin" && <NavItem to="/usuarios" label="Usuarios" />}
          
          {(role === "admin" || role === "vendedor") && (
            <NavItem to="/ventas" label="Ventas" />
          )}
          
          {role === "admin" && <NavItem to="/consultas" label="Consultas" />}
          
          <button 
            onClick={logout}
            className="px-3 py-1.5 rounded-lg hover:bg-amber-50 text-amber-900"
          >
            Salir ({user.name})
          </button>
        </nav>
      </div>
    </header>
  );
}

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-1.5 rounded-lg transition ${
          isActive ? 'bg-amber-100 text-amber-900' : 'hover:bg-amber-50'
        }`
      }
    >
      {label}
    </NavLink>
  );
}