import { useState, useEffect } from 'react';
import { IntegrantesContext } from '../hooks/IntegrantesContex'; // Importa el contexto
import integrantesData from '../data/integrantes'; // Importa tus datos

export const IntegrantesProvider = ({ children }) => {
  const [integrantes, setIntegrantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIntegrantes = async () => {
      try {
        setLoading(true);
        // Aquí podrías hacer un fetch real a una API
        // const response = await fetch('/api/integrantes');
        // const data = await response.json();
        // setIntegrantes(data);

        // Por ahora, usamos los datos importados directamente
        setIntegrantes(integrantesData);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los integrantes.');
        setLoading(false);
        console.error("Error fetching integrantes:", err);
      }
    };

    fetchIntegrantes();
  }, []);

  const value = {
    integrantes,
    loading,
    error,
    // Puedes añadir funciones aquí para manipular los integrantes si es necesario
    // Por ejemplo: addIntegrante, deleteIntegrante, updateIntegrante
  };

  return (
    <IntegrantesContext.Provider value={value}>
      {children}
    </IntegrantesContext.Provider>
  );
};