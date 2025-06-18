// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext'; // Asegúrate de que esta ruta sea correcta

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth(); // Obtenemos el estado de autenticación y el estado de carga

 if (loading) {
    return <div>Cargando autenticación...</div>; 
  }
  if (!isAuthenticated) {
    // Si no está autenticado, lo redirigimos a la página de login
    // `replace` asegura que la navegación reemplace la entrada actual en el historial
    return <Navigate to="/login" replace />;
  }
 return <Outlet />;
};

export default PrivateRoute;