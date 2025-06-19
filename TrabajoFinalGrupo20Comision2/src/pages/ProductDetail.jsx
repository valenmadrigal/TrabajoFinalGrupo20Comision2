import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/ProductsContext.js';
import { useFavorites } from '../hooks/FavoritesContext.js';
import { Container, Row, Col, Button, Image, Spinner, Alert, Card } from 'react-bootstrap'; // Importaciones de React-Bootstrap
import { FaStar, FaRegStar, FaEdit, FaArrowLeft } from 'react-icons/fa'; // Importar iconos de react-icons
import '../assets/CSS/Detalles.css'; // Importa el archivo CSS

function ProductDetail() {
  const { id } = useParams();
  const { getProductById, loading, error } = useProducts();
  const { favoriteIds, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const product = getProductById(id);
  const isFavorite = product ? favoriteIds.includes(product.id) : false;

  const simulatedStock = 10; // Stock simulado

  // --- Manejo de estados de carga y error ---
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando detalles del producto...</span>
        </Spinner>
        <p className="loading-message">Cargando detalles del producto...</p>
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

  if (!product) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="warning" className="product-not-found-message">
          Producto no encontrado.
        </Alert>
      </Container>
    );
  }

  // --- Funciones de manejo de eventos ---
  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
  };

  return (
    <Container className="product-detail-container">
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-4 back-button">
        <FaArrowLeft className="me-2" /> Volver
      </Button>

      <Card className="product-detail-card">
        <Row className="g-4">
          <Col md={6} className="d-flex justify-content-center align-items-center product-image-col">
            <div className="image-wrapper">
              <Image
                src={product.image}
                alt={product.title}
                fluid
                className="product-image"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x300/cccccc/333333?text=No+Image"; }}
              />
            </div>
          </Col>
          <Col md={6}>
            <Card.Body className="product-details-body">
              <Card.Title className="product-title">{product.title}</Card.Title>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Text className="product-price">${product.price ? product.price.toFixed(2) : 'N/A'}</Card.Text>
                <Button
                  variant="link" // Use link variant for a button that looks like text but functions as a button
                  onClick={handleToggleFavorite}
                  className="favorite-button"
                  aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
                >
                  {isFavorite ? <FaStar className="favorite-icon-filled" /> : <FaRegStar className="favorite-icon-outline" />}
                </Button>
              </div>

              <Card.Text className="product-description">
                {product.description || 'Este producto no tiene una descripción detallada.'}
              </Card.Text>

              <div className="d-flex justify-content-between mb-3 product-meta">
                <Card.Text><strong>Categoría:</strong> {product.category || 'Sin categoría'}</Card.Text>
                <Card.Text><strong>Stock Disponible:</strong> {simulatedStock}</Card.Text>
              </div>

              {/* Botón para editar el producto */}
              <Link to={`/editar/${product.id}`} className="btn btn-success edit-product-button">
                <FaEdit className="me-2" /> Editar Producto
              </Link>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default ProductDetail;