// src/pages/Home.jsx
import React from 'react';
import { useProducts } from '../context/ProductsContext.js'; // Importa el contexto de productos
import ProductCard from '../assets/components/ProductCard'; // Importa el componente de tarjeta de producto

function Home() {
  const { products, loading, error } = useProducts(); // Consume el contexto de productos

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
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 && !loading && !error && (
        <p style={{ textAlign: 'center', marginTop: '50px', fontSize: '1.1em', color: '#666' }}>No hay productos disponibles.</p>
      )}
    </div>
  );
}

export default Home;
