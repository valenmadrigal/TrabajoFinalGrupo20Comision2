// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para la navegación a detalles
import '../CSS/ProductCard.css'; // Mantenemos tu importación de CSS

import { FaTag, FaInfoCircle, FaHeart } from 'react-icons/fa'; // Añadimos FaHeart para el favorito
import { useFavorites } from '../../context/FavoritesContext.js'; // Importamos el custom hook de Favoritos

// Cambiamos el nombre de la prop de 'producto' a 'product' para ser consistente
// con el resto de la aplicación y la API de fakestoreapi.com
function ProductCard({ product }) {
  // Consumimos el contexto de Favoritos para acceder a sus funciones y estado
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  // Verificamos si el producto actual es favorito
  const favorite = isFavorite(product.id);

  // Función para manejar el clic en el botón/checkbox de favorito
  const handleToggleFavorite = () => {
    if (favorite) {
      removeFavorite(product.id); // Si ya es favorito, lo quitamos
    } else {
      addFavorite(product.id);    // Si no es favorito, lo añadimos
    }
  };

  return (
    <div className="card product-card shadow-sm h-100 fade-in">
      <img
        // Usamos product.image y un placeholder como fallback
        src={product.image || 'https://placehold.co/300x200/cccccc/333333?text=Sin+imagen'}
        className="card-img-top product-img"
        alt={product.title} // Usamos product.title en lugar de product.nombre
      />

      <div className="card-body d-flex flex-column">
        {/* Usamos product.title y product.description */}
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text text-muted">{product.description}</p>
        <p className="card-text fw-bold text-success">Precio: ${product.price.toFixed(2)}</p> {/* Formateamos el precio */}

        {/* Categoría con ícono */}
        <div className="product-category mb-3">
          <FaTag className="me-1 text-secondary" />
          <span className="badge bg-info text-dark">{product.category}</span> {/* Usamos product.category */}
        </div>

        <div className="mt-auto d-flex flex-column align-items-center gap-2">
          {/* El botón "Ver más" ahora es un Link de react-router-dom */}
          <Link to={`/product/${product.id}`} className="btn btn-info btn-ver-mas">
            <FaInfoCircle className="me-1" />
            Ver más detalles
          </Link>

          {/* Checkbox/Botón de Favorito */}
          {/* Usamos un botón para controlar el favorito, más versátil que un checkbox simple para UX */}
          <button
            onClick={handleToggleFavorite}
            className={`btn ${favorite ? 'btn-danger' : 'btn-outline-danger'}`} // Cambia el estilo según el estado
            style={{ width: '100%', marginTop: '10px' }}
          >
            <FaHeart className="me-1" />
            {favorite ? 'Quitar de Favoritos' : 'Añadir a Favoritos'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;