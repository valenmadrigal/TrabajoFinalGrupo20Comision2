import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

const AdminRoute = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <div>Cargando permisos...</div>;
  }

  if (!isAuthenticated || !isAdmin) {
    // Redirigir a login si no está autenticado, o a la raíz si no es admin
    return <Navigate to={isAuthenticated ? '/' : '/login'} replace />;
  }

  return <Outlet />;
};

export default AdminRoute;