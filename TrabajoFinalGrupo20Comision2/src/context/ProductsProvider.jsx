// context/ProductsProvider.jsx
import React, { useEffect, useState } from 'react';
import { ProductsContext } from '../hooks/ProductsContext'; // Importa el contexto

// Proveedor del contexto
export const ProductsProvider = ({ children }) => {
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
        setProducts(data);
      } catch (err) {
        setError('Error al cargar productos: ' + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  // Funciones CRUD (Create, Read, Update, Delete) para manipular los productos
  const getProductById = (id) => products.find((p) => p.id === parseInt(id));

  const addProduct = (newProduct) => {
    // Genera un nuevo ID basado en el ID más alto existente
    const newId = Math.max(0, ...products.map((p) => p.id)) + 1;
    const productWithId = { ...newProduct, id: newId };
    setProducts((prev) => [...prev, productWithId]);
    return productWithId; // Retorna el producto añadido con su nuevo ID
  };

  const editProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // El valor que se proveerá a todos los componentes que consuman este contexto
  const contextValue = {
    products,
    loading,
    error,
    getProductById,
    addProduct,
    editProduct,
    deleteProduct,
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
