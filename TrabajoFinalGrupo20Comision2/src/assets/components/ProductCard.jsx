import { Link } from 'react-router-dom';
import { useFavorites } from '../../hooks/FavoritesContext.js';
import { useProducts } from '../../hooks/ProductsContext.js';
import { useAuth } from '../../hooks/AuthContext.js'; // <-- ¡Añade o verifica esta línea!

import '../CSS/ProductCard.css'; // Asegurate de que esta ruta sea correcta

function ProductCard({ product }) {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const { deleteProduct } = useProducts();
  const { isAuthenticated, isAdmin } = useAuth(); // Obtén el estado de autenticación y si es admin
  const isFavorite = favoriteIds.includes(product.id);

  const handleToggleFavorite = (e) => {
    e.stopPropagation(); // Evita que el click en el botón de favorito active el enlace de la tarjeta
    toggleFavorite(product.id);
  };

  const handleDeleteProduct = (e) => {
    e.stopPropagation(); // Evita que el click en el botón de eliminar active el enlace de la tarjeta
    if (window.confirm('¿Estás seguro de que querés eliminar este producto?')) {
      deleteProduct(product.id);
    }
  };

  // Función para manejar errores de carga de imagen
  const handleImageError = (e) => {
    e.target.onerror = null; // Evita bucles infinitos de error
    e.target.src = "https://placehold.co/150x150/cccccc/333333?text=No+Image"; // Imagen de fallback
  };

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.title}
        className="product-image"
        onError={handleImageError} // Usa la función de manejo de errores
      />

      {/* Botón de Favorito */}
       {isAuthenticated && (
      <button
        onClick={handleToggleFavorite}
        className={`favorite-button ${isFavorite ? 'favorite-true' : 'favorite-false'}`}
        aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
      >
        {isFavorite ? '★' : '☆'}
      </button>
 )}
      <h3 className="product-title">{product.title}</h3>

      <div className="product-actions">
        <Link to={`/detalle/${product.id}`} className="detail-button">
          Ver más detalles
        </Link>
       {isAdmin && (
        <button
          onClick={handleDeleteProduct}
          className="delete-button"
          aria-label="Eliminar producto"
        >
          Eliminar
        </button>
         )}
      </div>
    </div>
  );
}

export default ProductCard;