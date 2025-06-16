// src/pages/FavoritesPage.jsx
import React from 'react';
import { useProducts } from '../context/ProductsContext.js'; // Contexto de productos
import { useFavorites } from '../context/FavoritesContext.js'; // Contexto de favoritos
import ProductCard from '../assets/components/ProductCard'; // Tarjeta de producto

function FavoritesPage() {
  const { products, loading, error } = useProducts(); // Todos los productos
  const { favoriteIds } = useFavorites(); // IDs de los productos favoritos

  // Filtra los productos para mostrar solo los que son favoritos
  const favoriteProducts = products.filter(product => favoriteIds.includes(product.id));

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '50px', fontSize: '1.2em' }}>Cargando productos favoritos...</p>;
  }

  if (error) {
    return <p style={{ textAlign: 'center', marginTop: '50px', color: 'red', fontSize: '1.2em' }}>Error: {error}</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Mis Productos Favoritos</h1>
      {favoriteProducts.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '50px', fontSize: '1.1em', color: '#666' }}>No tienes productos favoritos aún.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', justifyContent: 'center' }}>
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;