// src/pages/Home.jsx
import React from 'react';
import { useProducts } from '../hooks/ProductsContext.js'; // Contexto de productos
import ProductCard from '../assets/components/ProductCard'; // Tarjeta de producto
// Ya no necesitamos useFavorites aquí, ya que ProductCard lo consume directamente

function Home() {
  const { products, loading, error } = useProducts(); // Obtiene productos del ProductsContext

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '50px', fontSize: '1.2em' }}>Cargando productos...</p>;
  }

  if (error) {
    return <p style={{ textAlign: 'center', marginTop: '50px', color: 'red', fontSize: '1.2em' }}>Error: {error}</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Nuestros Productos</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', justifyContent: 'center' }}>
        {products.map((product) => (
          // ProductCard ahora gestiona si es favorito internamente con useFavorites
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;