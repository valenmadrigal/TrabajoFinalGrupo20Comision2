// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext.js'; // Contexto de productos
import { useFavorites } from '../context/FavoritesContext.js'; // Contexto de favoritos

function ProductDetail() {
  const { id } = useParams(); // Obtiene el ID del producto de la URL
  const { getProductById, loading, error } = useProducts(); // Consume el contexto de productos
  const { addFavorite, removeFavorite, isFavorite } = useFavorites(); // Consume el contexto de favoritos

  const [product, setProduct] = useState(null);

useEffect(() => {
  if (!loading && !error) {
    setProduct(getProductById(id));
  }
}, [loading, error, id, getProductById]); // Busca el producto por ID en el estado global
  const favorite = product ? isFavorite(product.id) : false;

  const handleToggleFavorite = () => {
    if (product) {
      if (favorite) {
        removeFavorite(product.id);
      } else {
        addFavorite(product.id);
      }
    }
  };

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '50px', fontSize: '1.2em' }}>Cargando detalles del producto...</p>;
  }

  if (error) {
    return <p style={{ textAlign: 'center', marginTop: '50px', color: 'red', fontSize: '1.2em' }}>Error: {error}</p>;
  }

  if (!product) {
    return <p style={{ textAlign: 'center', marginTop: '50px', fontSize: '1.2em' }}>Producto no encontrado.</p>;
  }

  return (
    <div style={{
      maxWidth: '800px',
      margin: '40px auto',
      padding: '30px',
      border: '1px solid #eee',
      borderRadius: '10px',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <img src={product.image} alt={product.title} style={{ maxWidth: '300px', height: 'auto', objectFit: 'contain', marginBottom: '20px' }} />
      <h1 style={{ fontSize: '2em', marginBottom: '10px', textAlign: 'center', color: '#333' }}>{product.title}</h1>
      <p style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#007bff', marginBottom: '20px' }}>${product.price.toFixed(2)}</p>
      <p style={{ fontSize: '1.1em', lineHeight: '1.6', textAlign: 'justify', marginBottom: '20px' }}>
        <strong>Descripción:</strong> {product.description}
      </p>
      <p style={{ fontSize: '1.1em', marginBottom: '10px' }}>
        <strong>Categoría:</strong> {product.category}
      </p>
      {/* FakeStoreAPI no tiene 'stock', así que lo simulamos o lo omitimos */}
      <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
        <strong>Stock:</strong> Disponible (simulado)
      </p>
      <div style={{ display: 'flex', gap: '15px' }}>
        <button
          onClick={handleToggleFavorite}
          style={{
            background: favorite ? '#dc3545' : '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1em',
            transition: 'background-color 0.3s ease'
          }}
        >
          {favorite ? '★ Quitar de Favoritos' : '☆ Añadir a Favoritos'}
        </button>
        <Link to={`/product/edit/${product.id}`} style={{
          textDecoration: 'none',
          background: '#ffc107',
          color: '#333',
          padding: '10px 15px',
          borderRadius: '5px',
          fontSize: '1em',
          transition: 'background-color 0.3s ease'
        }}>
          Editar Producto
        </Link>
        <Link to="/" style={{
          textDecoration: 'none',
          background: '#6c757d',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '5px',
          fontSize: '1em',
          transition: 'background-color 0.3s ease'
        }}>
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}

export default ProductDetail;