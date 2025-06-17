// context/AuthProvider.jsx
import React, { useState, useEffect } from 'react';
import { AuthContext } from '../hooks/AuthContext'; // Importa el contexto

// Clave para almacenar la información del usuario en localStorage
const USER_STORAGE_KEY = 'currentUser';

export const AuthProvider = ({ children }) => {
  // Estado para el usuario autenticado. Se inicializa intentando leer de localStorage.
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      // Si hay un usuario almacenado, lo parsea; de lo contrario, es null
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Error al cargar el usuario desde localStorage:', error);
      return null; // En caso de error, no hay usuario
    }
  });

  // Estado para manejar si la autenticación inicial está cargando (e.g., leyendo de localStorage)
  const [loading, setLoading] = useState(false); // Cambiado a false ya que la carga inicial es síncrona con useState

  // Función de login simulada
  const login = async (username, password) => {
    setLoading(true);
    // Simulación de una llamada a una API
    return new Promise((resolve, reject) => {
      setTimeout(() => { // Simula un retraso de red
        if (username === 'admin' && password === '1234') {
          const newUser = { id: 1, username: 'test', email: 'test@example.com' };
          setUser(newUser);
          // Guarda el usuario en localStorage
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
          resolve(newUser);
        } else {
          const error = new Error('Nombre de usuario o contraseña incorrectos.');
          reject(error);
        }
        setLoading(false);
      }, 1000); // 1 segundo de retraso
    });
  };

  // Función de logout
  const logout = () => {
    setUser(null);
    // Elimina el usuario de localStorage
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  // El valor que se proveerá a todos los componentes que consuman este contexto
  const authContextValue = {
    user,      // Información del usuario autenticado (o null si no hay)
    loading,   // Indica si una operación de login/logout está en curso
    login,     // Función para iniciar sesión
    logout,    // Función para cerrar sesión
    isAuthenticated: !!user, // Booleano para saber si hay un usuario autenticado
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
