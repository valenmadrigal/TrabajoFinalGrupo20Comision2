// src/assets/components/ProductCard.jsx
import { Link } from 'react-router-dom'; // Necesario para el botón "Ver más detalles"
import { useFavorites } from '../../hooks/FavoritesContext.js'; // Para el ícono de favoritos
import '../CSS/ProductCard.css'; // un archivo CSS para estilos adicionales

// Componente que representa una tarjeta individual de producto
function ProductCard({ product }) {
  // Accedemos al array de IDs de productos favoritos y a la función que los alterna
  const { favoriteIds, toggleFavorite } = useFavorites();

  // Verificamos si este producto ya es favorito
  const isFavorite = favoriteIds.includes(product.id);

  // Maneja el clic en el botón de favorito
  const handleToggleFavorite = (e) => {
    e.stopPropagation(); // Evita que el clic afecte a otros elementos (como el enlace)

    const button = e.currentTarget;

    // Alterna el estado de favorito
    toggleFavorite(product.id);
  };

  return (
    <div className="product-card"> {/* Contenedor principal con estilos y animaciones */}
      
      {/* Imagen del producto */}
      <img
  src={product.image}
  alt={product.title}
  className="product-image"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "https://placehold.co/150x150/cccccc/333333?text=No+Image";
  }}
/>

<button
  onClick={handleToggleFavorite}
  className={`favorite-button ${isFavorite ? 'favorite-true' : 'favorite-false'}`}
  aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
>
  {isFavorite ? '★' : '☆'}
</button>

<h3 className="product-title">{product.title}</h3>

<Link to={`/detalle/${product.id}`} className="detail-button">
  Ver más detalles
</Link>
    </div>
  );
}

export default ProductCard;
