import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/ProductsContext'; // Para acceder a productos y funciones CRUD
import { Container, Form, Button, Alert, Card } from 'react-bootstrap'; // Importaciones de React-Bootstrap
import { FaSave, FaTimesCircle } from 'react-icons/fa'; // Iconos para guardar y cancelar
import '../assets/CSS/Formulario.css'; // Importa el archivo CSS

function ProductForm() {
  const { id } = useParams(); // Obtiene el ID de la URL si estamos en modo edición
  const navigate = useNavigate(); // Para redirigir después de guardar
  const { products, getProductById, addProduct, editProduct } = useProducts();

  // Estado local para los campos del formulario
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [formError, setFormError] = useState(null); // Para errores específicos del formulario

  // useEffect para precargar datos si estamos en modo edición
  useEffect(() => {
    if (id) { // Si hay un ID en la URL, estamos en modo edición
      setIsEditMode(true);
      const productToEdit = getProductById(id);
      if (productToEdit) {
        setFormData({
          title: productToEdit.title || '',
          price: productToEdit.price || '',
          description: productToEdit.description || '',
          category: productToEdit.category || '',
          image: productToEdit.image || '',
        });
      } else {
        // Producto no encontrado, podrías redirigir o mostrar un error
        setFormError('Producto no encontrado para editar.');
      }
    } else {
      // No hay ID, estamos en modo creación, asegurar que el formulario esté limpio
      setIsEditMode(false);
      setFormData({
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
      });
    }
    setFormError(null); // Limpiar errores al cambiar de modo
  }, [id, getProductById, products]); // Dependencias: id, y las funciones/estados del contexto

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    // Validación básica
    if (!formData.title || !formData.price || !formData.description || !formData.category || !formData.image) {
      setFormError('Todos los campos son obligatorios.');
      return;
    }
    if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      setFormError('El precio debe ser un número válido mayor que cero.');
      return;
    }

    // Prepara el objeto producto con el tipo de dato correcto para el precio
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
    };

    try {
      if (isEditMode) {
        // En modo edición, añadimos el ID al objeto del producto
        await editProduct({ ...productData, id: parseInt(id) });
        alert('Producto actualizado con éxito!');
      } else {
        await addProduct(productData);
        alert('Producto creado con éxito!');
      }
      navigate('/products'); // Redirige a la página de productos (Home)
    } catch (error) {
      // Manejar errores de las funciones addProduct/editProduct si fueran asíncronas
      console.error('Error al guardar el producto:', error);
      setFormError(`Error al guardar el producto: ${error.message || 'Error desconocido'}`);
    }
  };

  return (
    <Container className="product-form-container">
      <Card className="product-form-card">
        <Card.Body>
          <Card.Title className="text-center mb-4 product-form-title">
            {isEditMode ? 'Editar Producto' : 'Crear Nuevo Producto'}
          </Card.Title>

          {formError && (
            <Alert variant="danger" className="text-center mb-3">
              {formError}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Título:</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Precio:</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Descripción:</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Categoría:</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
              <Form.Label>URL de Imagen:</Form.Label>
              <Form.Control
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-grid gap-2 mt-4">
              <Button variant="primary" type="submit" className="save-button">
                <FaSave className="me-2" /> {isEditMode ? 'Actualizar Producto' : 'Crear Producto'}
              </Button>
              <Button variant="secondary" type="button" onClick={() => navigate(-1)} className="cancel-button">
                <FaTimesCircle className="me-2" /> Cancelar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductForm;