import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/ProductsContext'; // Para acceder a productos y funciones CRUD
import { Container, Form, Button, Alert, Card } from 'react-bootstrap'; // Importaciones de React-Bootstrap
import { FaSave, FaTimesCircle } from 'react-icons/fa'; // Iconos para guardar y cancelar
import '../assets/CSS/Formulario.css'; // Importa el archivo CSS
import { validateProductForm, productCategories } from '../hooks/productsValidation.js';

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
   const [validationErrors, setValidationErrors] = useState({});
  const [submitError, setSubmitError] = useState(null); // Para errores de envío (ej. de la API)

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
      setValidationErrors({}); // Limpiar errores de validación al cambiar de modo/ID
    setSubmitError(null); // Limpiar errores de envío al cambiar de modo/ID
  }, [id, getProductById, products]); // Dependencias: id, y las funciones/estados del contexto

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (validationErrors[name]) {
      setValidationErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     setValidationErrors({}); // Limpiar errores de validación anteriores
    setSubmitError(null); // Limpiar errores de envío anteriores

    // Validación básica
      const errors = validateProductForm(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors); // Establece los errores específicos por campo
      setSubmitError('Por favor, corrige los errores en el formulario.'); // Mensaje general
      return; // Detiene el envío si hay errores de validación
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

          {/* Mostrar error general de envío (si lo hay) */}
          {submitError && (
            <Alert variant="danger" className="text-center mb-3">
              {submitError}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            {/* Título */}
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Título:</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                // ¡Quitamos required! La validación la hacemos nosotros
                isInvalid={!!validationErrors.title} // Resalta el campo si hay error
              />
              {/* Mensaje de error personalizado para el título */}
              <Form.Control.Feedback type="invalid">
                {validationErrors.title}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Precio */}
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Precio:</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                isInvalid={!!validationErrors.price} // Resalta el campo si hay error
              />
              {/* Mensaje de error personalizado para el precio */}
              <Form.Control.Feedback type="invalid">
                {validationErrors.price}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Descripción */}
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Descripción:</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                isInvalid={!!validationErrors.description} // Resalta el campo si hay error
              />
              {/* Mensaje de error personalizado para la descripción */}
              <Form.Control.Feedback type="invalid">
                {validationErrors.description}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Categoría (Lista Desplegable) */}
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Categoría:</Form.Label>
              <Form.Control
                as="select" // Usamos 'select' para la lista desplegable
                name="category"
                value={formData.category}
                onChange={handleChange}
                isInvalid={!!validationErrors.category}
              >
                <option value="">Seleccione una categoría</option> {/* Opción por defecto */}
                {productCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {validationErrors.category}
              </Form.Control.Feedback>
            </Form.Group>

            {/* URL de Imagen */}
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>URL de Imagen:</Form.Label>
              <Form.Control
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                isInvalid={!!validationErrors.image} // Resalta el campo si hay error
              />
              {/* Mensaje de error personalizado para la imagen */}
              <Form.Control.Feedback type="invalid">
                {validationErrors.image}
              </Form.Control.Feedback>
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