import { useProducts } from '../hooks/ProductsContext.js'; // Contexto de productos
import ProductCard from '../assets/components/ProductCard'; // Tarjeta de producto
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap'; // Importaciones de React-Bootstrap
import '../assets/CSS/Home.css'; // Importa el archivo CSS

function Home() {
  const { products, loading, error } = useProducts(); // Obtiene productos del ProductsContext

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

  // Filtrar los productos para mostrar solo los que están activos
  const activeProducts = products.filter(product => product.isActive);

  // Mensaje si no hay productos activos después del filtro
  if (activeProducts.length === 0) {
    return (
      <Container className="text-center mt-5">
        <p className="no-products-message">No hay productos disponibles.</p>
      </Container>
    );
  }

  return (
    <Container className="home-page-container">
      <h1 className="home-title">Nuestros Productos</h1>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center">
        {activeProducts.map((product) => ( // Usar activeProducts aquí
          <Col key={product.id} className="d-flex justify-content-center">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;