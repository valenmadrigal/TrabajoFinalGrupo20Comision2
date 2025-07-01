// src/hooks/IntegrantesContext.js
import { createContext, useContext } from 'react';

// 1. Crear el Contexto
export const IntegrantesContext = createContext();

// 2. Crear el Hook personalizado para consumir el contexto
export const useIntegrantes = () => {
  const context = useContext(IntegrantesContext);
  if (context === undefined) {
    throw new Error('useIntegrantes must be used within an IntegrantesProvider');
  }
  return context;
};