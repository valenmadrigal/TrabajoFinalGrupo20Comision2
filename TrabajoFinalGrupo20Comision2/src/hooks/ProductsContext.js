// context/ProductsContext.js
import { createContext, useContext } from 'react';

// Crear el contexto
export const ProductsContext = createContext();

// Hook personalizado para acceder al contexto
export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts debe usarse dentro de ProductsProvider');
  }
  return context;
};