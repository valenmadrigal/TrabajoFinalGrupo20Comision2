// src/assets/components/ProductCard.jsx
import { Link } from 'react-router-dom';
import { useFavorites } from '../../hooks/FavoritesContext.js';
import { useProducts } from '../../hooks/ProductsContext.js'; // AÑADIR: Importar useProducts
import '../CSS/ProductCard.css';

// Componente que representa una tarjeta individual de producto
function ProductCard({ product }) {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const { deleteProduct } = useProducts(); // AÑADIR: Obtener la función deleteProduct del contexto

  const isFavorite = favoriteIds.includes(product.id);

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  // AÑADIR: Función para manejar el borrado lógico del producto
  const handleDeleteProduct = (e) => {
    e.stopPropagation(); // Evita que el clic afecte a otros elementos
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      deleteProduct(product.id);
    }
  };

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.title}
        className="product-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/150x150/cccccc/333333?text=No+Image";
        }}
      />

      {/* Botón de Favorito */}
      <button
        onClick={handleToggleFavorite}
        className={`favorite-button ${isFavorite ? 'favorite-true' : 'favorite-false'}`}
        aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
      >
        {isFavorite ? '★' : '☆'}
      </button>

      <h3 className="product-title">{product.title}</h3>

      {/* Contenedor para botones de acción (detalles y borrar) */}
      <div className="product-actions"> 
        <Link to={`/detalle/${product.id}`} className="detail-button">
          Ver más detalles
        </Link>
        {/* AÑADIR: Botón de borrado lógico */}
        <button
          onClick={handleDeleteProduct}
          className="delete-button" // Puedes añadir estilos en ProductCard.css para esta clase
          aria-label="Eliminar producto"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default ProductCard;