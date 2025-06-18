import { Link } from 'react-router-dom';
import { useFavorites } from '../../hooks/FavoritesContext.js';
import { useProducts } from '../../hooks/ProductsContext.js';
import '../CSS/ProductCard.css';


function ProductCard({ product }) {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const { deleteProduct } = useProducts(); 

  const isFavorite = favoriteIds.includes(product.id);

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

 
  const handleDeleteProduct = (e) => {
    e.stopPropagation(); 
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

     
      <div className="product-actions"> 
        <Link to={`/detalle/${product.id}`} className="detail-button">
          Ver más detalles
        </Link>
       
        <button
          onClick={handleDeleteProduct}
          className="delete-button" 
          aria-label="Eliminar producto"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default ProductCard;