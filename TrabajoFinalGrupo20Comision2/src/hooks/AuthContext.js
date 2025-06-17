// context/AuthContext.js
import { createContext, useContext } from 'react';

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  // Lanzar un error si useAuth se usa fuera de AuthProvider
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
