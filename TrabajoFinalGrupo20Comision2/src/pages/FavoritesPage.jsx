import { useProducts } from '../hooks/ProductsContext.js'; // Contexto de productos (para obtener todos los productos)
import { useFavorites } from '../hooks/FavoritesContext.js'; // Contexto de favoritos (para obtener los IDs favoritos)
import ProductCard from '../assets/components/ProductCard'; // Tarjeta de producto

function FavoritesPage() {
  const { products, loading, error } = useProducts(); // Obtiene todos los productos de ProductsContext
  const { favoriteIds } = useFavorites(); // Obtiene los IDs de los productos favoritos de FavoritesContext

  // Manejo de estados de carga y error
  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '50px', fontSize: '1.2em' }}>Cargando productos...</p>;
  }

  if (error) {
    return <p style={{ textAlign: 'center', marginTop: '50px', color: 'red', fontSize: '1.2em' }}>Error: {error}</p>;
  }

  // Filtra la lista completa de productos para mostrar solo los que son favoritos
  const favoriteProducts = products.filter(product => favoriteIds.includes(product.id));

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Mis Productos Favoritos</h1>
      {favoriteProducts.length === 0 ? (
        // Mensaje si no hay productos favoritos
        <p style={{ textAlign: 'center', marginTop: '50px', fontSize: '1.1em', color: '#666' }}>No tienes productos favoritos aún.</p>
      ) : (
        // Grid para mostrar las tarjetas de los productos favoritos
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', justifyContent: 'center' }}>
          {favoriteProducts.map((product) => (
            // Renderiza ProductCard para cada producto favorito.
            // ProductCard internamente usa useFavorites para determinar si está marcado.
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;