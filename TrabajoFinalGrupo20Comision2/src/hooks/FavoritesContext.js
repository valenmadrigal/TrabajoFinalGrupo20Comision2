// context/FavoritesContext.js
import { createContext, useContext } from 'react';

// Crear el contexto de Favoritos
export const FavoritesContext = createContext();

// Hook personalizado para acceder al contexto de Favoritos
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de FavoritesProvider');
  }
  return context;
};