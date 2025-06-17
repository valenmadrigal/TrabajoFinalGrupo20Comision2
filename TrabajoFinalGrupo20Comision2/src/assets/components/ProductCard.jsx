// src/assets/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Necesario para el botón "Ver más detalles"
import { useFavorites } from '../../hooks/FavoritesContext.js'; // Para el ícono de favoritos

function ProductCard({ product }) {
  const { favoriteIds, toggleFavorite } = useFavorites(); // Obtiene favoriteIds y la función para alternar
  const isFavorite = favoriteIds.includes(product.id); // Verifica si el producto es favorito

  const handleToggleFavorite = (e) => {
    e.stopPropagation(); // Evita que se dispare el evento de la tarjeta o del enlace
    toggleFavorite(product.id);
  };

  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      padding: '15px',
      margin: '10px',
      textAlign: 'center',
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 'auto',
      minHeight: '320px', // Altura mínima ajustada para menos contenido
      maxWidth: '300px'
    }}>
      <div style={{ position: 'relative', width: '100%', height: '180px', marginBottom: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          src={product.image}
          alt={product.title}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '4px' }}
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/cccccc/333333?text=No+Image"; }} // Placeholder en caso de error
        />
        {/* Botón/Icono de Favorito */}
        <button
          onClick={handleToggleFavorite}
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            background: 'none',
            border: 'none',
            fontSize: '1.8em',
            cursor: 'pointer',
            color: isFavorite ? '#ffc107' : '#ccc', // Amarillo para favorito, gris para no favorito
            padding: '5px',
            borderRadius: '50%',
            transition: 'color 0.2s ease-in-out'
          }}
          aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          {isFavorite ? '★' : '☆'} {/* Estrella rellena o vacía */}
        </button>
      </div>

      <h3 style={{ fontSize: '1.2em', margin: '10px 0', color: '#333', minHeight: '3em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {product.title}
      </h3>
      {/* PRECIO, DESCRIPCIÓN Y CATEGORÍA ELIMINADOS DE AQUÍ */}

      {/* Botón para ver más detalles */}
      <Link
        to={`/detalle/${product.id}`}
        style={{
          display: 'block',
          width: '100%',
          padding: '10px 15px',
          backgroundColor: '#28a745',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          marginTop: '15px',
          transition: 'background-color 0.2s ease',
          boxSizing: 'border-box'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
      >
        Ver más detalles
      </Link>
    </div>
  );
}

export default ProductCard;