// src/pages/ProductDetail.jsx (Modificado)
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/ProductsContext.js';
import { useFavorites } from '../hooks/FavoritesContext.js';

function ProductDetail() {
  const { id } = useParams();
  const { getProductById, loading, error } = useProducts();
  const { favoriteIds, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const product = getProductById(id);
  const isFavorite = product ? favoriteIds.includes(product.id) : false;

  const simulatedStock = 10;

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '50px', fontSize: '1.2em' }}>Cargando detalles del producto...</p>;
  }

  if (error) {
    return <p style={{ textAlign: 'center', marginTop: '50px', color: 'red', fontSize: '1.2em' }}>Error: {error}</p>;
  }

  if (!product) {
    return <p style={{ textAlign: 'center', marginTop: '50px', fontSize: '1.2em' }}>Producto no encontrado.</p>;
  }

  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '50px auto', border: '1px solid #e0e0e0', borderRadius: '10px', boxShadow: '0 6px 12px rgba(0,0,0,0.15)', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
      <button
        onClick={() => navigate(-1)}
        style={{ /* ... estilos ... */ }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
      >
        ← Volver
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', overflow: 'hidden', borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px' }}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x300/cccccc/333333?text=No+Image"; }}
          />
        </div>

        <h1 style={{ fontSize: '2.2em', color: '#333', marginBottom: '10px', textAlign: 'center' }}>
          {product.title}
        </h1>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <p style={{ fontWeight: 'bold', fontSize: '1.8em', color: '#007bff' }}>
            ${product.price ? product.price.toFixed(2) : 'N/A'}
          </p>
          <button
            onClick={handleToggleFavorite}
            style={{ /* ... estilos ... */ }}
            aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>

        <p style={{ fontSize: '1.1em', color: '#555', lineHeight: '1.6', marginBottom: '20px' }}>
          {product.description || 'Este producto no tiene una descripción detallada.'}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '1.05em', color: '#444' }}>
          <p><strong>Categoría:</strong> {product.category || 'Sin categoría'}</p>
          <p><strong>Stock Disponible:</strong> {simulatedStock}</p>
        </div>

        {/* AÑADIR: Botón para editar el producto */}
        <Link 
            to={`/editar/${product.id}`} 
            style={{ 
                display: 'block', 
                textAlign: 'center', 
                backgroundColor: '#28a745', 
                color: 'white', 
                padding: '12px 20px', 
                borderRadius: '5px', 
                textDecoration: 'none', 
                fontSize: '1.1em', 
                marginTop: '20px',
                transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
        >
            Editar Producto
        </Link>
      </div>
    </div>
  );
}

export default ProductDetail;