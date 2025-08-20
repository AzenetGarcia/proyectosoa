// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './modules/auth/AuthContext';
import ProductsModule from './products';
import UsersModule from './modules/users/UsersModule';
import SalesModule from './modules/sales/SalesModule';
import ReportsModule from './modules/reports/ReportsModule';
import LoginFancy from './modules/auth/LoginFancy';
import RegisterMongo from './modules/auth/RegisterMongo';
import RequireAuth from './modules/auth/RequireAuth';
import Header from './components/Header';

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-amber-900">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 text-gray-800 font-poppins">
      {user && <Header />}
      
      <main className={user ? "container mx-auto p-6 md:p-8" : ""}>
        <Routes>
          {/* Rutas públicas */}
          <Route 
            path="/login" 
            element={user ? <Navigate to="/productos" replace /> : <LoginFancy />} 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/productos" replace /> : <RegisterMongo />} 
          />
          
          {/* Rutas protegidas */}
          <Route 
            path="/" 
            element={<Navigate to={user ? "/productos" : "/login"} replace />} 
          />
          
          <Route 
            path="/productos" 
            element={
              <RequireAuth allowedRoles={["admin", "vendedor", "cliente"]}>
                <ProductsModule />
              </RequireAuth>
            } 
          />
          
          <Route 
            path="/usuarios" 
            element={
              <RequireAuth allowedRoles={["admin"]}>
                <UsersModule />
              </RequireAuth>
            } 
          />
          
          <Route 
            path="/ventas" 
            element={
              <RequireAuth allowedRoles={["admin", "vendedor"]}>
                <SalesModule />
              </RequireAuth>
            } 
          />
          
          <Route 
            path="/consultas" 
            element={
              <RequireAuth allowedRoles={["admin"]}>
                <ReportsModule />
              </RequireAuth>
            } 
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

function NotFound() {
  return (
    <div className="text-center py-16">
      <p className="text-2xl">404 • Página no encontrada</p>
    </div>
  );
}