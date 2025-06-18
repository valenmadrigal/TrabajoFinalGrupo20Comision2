import { useProducts } from '../hooks/ProductsContext.js'; // Contexto de productos (para obtener todos los productos)
import { useFavorites } from '../hooks/FavoritesContext.js'; // Contexto de favoritos (para obtener los IDs favoritos)
import ProductCard from '../assets/components/ProductCard'; // Tarjeta de producto
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap'; // Importaciones de React-Bootstrap
import '../assets/CSS/favoritos.css'; // Importa el archivo CSS

function FavoritesPage() {
  const { products, loading, error } = useProducts(); // Obtiene todos los productos de ProductsContext
  const { favoriteIds } = useFavorites(); // Obtiene los IDs de los productos favoritos de FavoritesContext

  // Manejo de estados de carga y error
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando productos...</span>
        </Spinner>
        <p className="loading-message">Cargando productos...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger" className="error-message">
          Error: {error}
        </Alert>
      </Container>
    );
  }

  // Filtra la lista completa de productos para mostrar solo los que son favoritos
  const favoriteProducts = products.filter(product => favoriteIds.includes(product.id));

  return (
    <Container className="favorites-page-container">
      <h1 className="favorites-title">Mis Productos Favoritos</h1>
      {favoriteProducts.length === 0 ? (
        // Mensaje si no hay productos favoritos
        <p className="no-favorites-message">No tienes productos favoritos aún.</p>
      ) : (
        // Grid para mostrar las tarjetas de los productos favoritos
        <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center">
          {favoriteProducts.map((product) => (
            // Renderiza ProductCard para cada producto favorito.
            // ProductCard internamente usa useFavorites para determinar si está marcado.
            <Col key={product.id} className="d-flex justify-content-center">
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default FavoritesPage;