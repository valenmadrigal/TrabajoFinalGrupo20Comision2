import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/ProductsContext'; // Para acceder a productos y funciones CRUD

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
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        {isEditMode ? 'Editar Producto' : 'Crear Nuevo Producto'}
      </h1>

      {formError && (
        <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>
        <div>
          <label htmlFor="price" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Precio:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>
        <div>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical' }}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="category" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Categoría:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>
        <div>
          <label htmlFor="image" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>URL de Imagen:</label>
          <input
            type="url" // Usar type="url" para validación básica de URL
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '12px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1.1em',
            marginTop: '20px',
            transition: 'background-color 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          {isEditMode ? 'Actualizar Producto' : 'Crear Producto'}
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: '#6c757d',
            color: 'white',
            padding: '12px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1.1em',
            marginTop: '10px',
            transition: 'background-color 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default ProductForm;