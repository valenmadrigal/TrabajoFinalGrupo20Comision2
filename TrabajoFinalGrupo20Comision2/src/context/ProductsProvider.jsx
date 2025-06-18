// context/ProductsProvider.jsx
import React, { useEffect, useState } from 'react';
import { ProductsContext } from '../hooks/ProductsContext';

// Proveedor del contexto
export const ProductsProvider = ({ children }) => {
  // Inicializamos el estado con una función para añadir 'isActive: true' a cada producto.
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lógica para cargar productos al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        const data = await res.json();
        // AÑADIR: Por defecto, todos los productos cargados estarán activos
        const productsWithActiveStatus = data.map(p => ({ ...p, isActive: true }));
        setProducts(productsWithActiveStatus);
      } catch (err) {
        setError('Error al cargar productos: ' + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Funciones CRUD
  const getProductById = (id) => products.find((p) => p.id === parseInt(id));

  const addProduct = (newProduct) => {
    // Genera un nuevo ID basado en el ID más alto existente
    const newId = Math.max(0, ...products.map((p) => p.id)) + 1;
    // AÑADIR: El nuevo producto también inicia como activo
    const productWithId = { ...newProduct, id: newId, isActive: true };
    setProducts((prev) => [...prev, productWithId]);
    return productWithId;
  };

  const editProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  // MODIFICADO: Esta función ahora realiza un borrado lógico
  const deleteProduct = (idToDelete) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === idToDelete ? { ...p, isActive: false } : p
      )
    );
  };

  // El valor que se proveerá a todos los componentes que consuman este contexto
  const contextValue = {
    products,
    loading,
    error,
    getProductById,
    addProduct,
    editProduct,
    deleteProduct, // Esta función ahora hace borrado lógico
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};