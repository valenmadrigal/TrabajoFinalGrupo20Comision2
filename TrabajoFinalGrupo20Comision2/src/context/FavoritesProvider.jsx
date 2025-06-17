// context/FavoritesProvider.jsx
import React, { useState, useEffect } from 'react';
import { FavoritesContext } from '../hooks/FavoritesContext';

// Clave para almacenar los IDs de favoritos en localStorage
const FAVORITE_IDS_STORAGE_KEY = 'favoriteProductIds';

export const FavoritesProvider = ({ children }) => {
  // Estado para guardar los IDs de productos favoritos.
  // Se inicializa leyendo desde localStorage al inicio.
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const storedIds = localStorage.getItem(FAVORITE_IDS_STORAGE_KEY);
      // Parsea los IDs almacenados, o retorna un array vacío si no hay nada
      return storedIds ? JSON.parse(storedIds) : [];
    } catch (e) {
      console.error("Error al cargar los IDs de favoritos desde localStorage", e);
      return []; // Retorna un array vacío en caso de error
    }
  });

  // Efecto para guardar los IDs de favoritos en localStorage cada vez que cambian
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITE_IDS_STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch (e) {
      console.error("Error al guardar los IDs de favoritos en localStorage", e);
    }
  }, [favoriteIds]); // Dependencia: el efecto se ejecuta cuando favoriteIds cambia

  // Función para alternar el estado de favorito de un producto
  const toggleFavorite = (productId) => {
    setFavoriteIds((prevIds) => {
      if (prevIds.includes(productId)) {
        // Si el producto ya es favorito, lo elimina de la lista
        return prevIds.filter((id) => id !== productId);
      } else {
        // Si el producto no es favorito, lo añade a la lista
        return [...prevIds, productId];
      }
    });
  };

  // El valor que se proveerá a todos los componentes que consuman este contexto
  const contextValue = {
    favoriteIds,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};
