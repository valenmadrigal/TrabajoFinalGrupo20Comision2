import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
export const FavoritesContext = createContext();

// Hook personalizado para usar el contexto
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de FavoritesProvider');
  }
  return context;
};

// Proveedor del contexto
export const FavoritesProvider = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const stored = localStorage.getItem('favoriteProductIds');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Error leyendo favoritos desde localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('favoriteProductIds', JSON.stringify(favoriteIds));
    } catch (e) {
      console.error('Error guardando favoritos en localStorage', e);
    }
  }, [favoriteIds]);

  const addFavorite = (id) => {
    setFavoriteIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFavorite = (id) => {
    setFavoriteIds((prev) => prev.filter((favId) => favId !== id));
  };

  const isFavorite = (id) => favoriteIds.includes(id);

  return (
    <FavoritesContext.Provider value={{ favoriteIds, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
