import React, { createContext, useContext, useEffect, useState } from 'react';

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

// Proveedor del contexto
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, []);

  const getProductById = (id) => products.find((p) => p.id === parseInt(id));

  const addProduct = (newProduct) => {
    const newId = Math.max(0, ...products.map((p) => p.id)) + 1;
    const productWithId = { ...newProduct, id: newId };
    setProducts((prev) => [...prev, productWithId]);
    return productWithId;
  };

  const editProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        getProductById,
        addProduct,
        editProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
