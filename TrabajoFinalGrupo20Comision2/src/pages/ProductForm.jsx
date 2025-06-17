// src/pages/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/ProductsContext.js'; // Contexto de productos

function ProductForm() {
  const { id } = useParams(); // Obtiene el ID si estamos en modo edición
  const navigate = useNavigate();
  const { getProductById, addProduct, editProduct } = useProducts(); // Funciones del contexto

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [ratingRate, setRatingRate] = useState(''); // FakeStoreAPI tiene rating.rate
  const [ratingCount, setRatingCount] = useState(''); // FakeStoreAPI tiene rating.count

  const isEditing = Boolean(id); // Determina si estamos editando o creando

  // Carga los datos del producto si estamos editando
  useEffect(() => {
    if (isEditing) {
      const productToEdit = getProductById(id);
      if (productToEdit) {
        setTitle(productToEdit.title || '');
        setPrice(productToEdit.price || '');
        setDescription(productToEdit.description || '');
        setCategory(productToEdit.category || '');
        setImage(productToEdit.image || '');
        // Asegúrate de que las propiedades anidadas existan antes de acceder
        setRatingRate(productToEdit.rating?.rate || '');
        setRatingCount(productToEdit.rating?.count || '');
      } else {
        // Si el producto no se encuentra, redirige a la página principal
        alert('Producto no encontrado para editar.');
        navigate('/');
      }
    }
  }, [id, isEditing, getProductById, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!title || !price || !description || !category || !image) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    const productData = {
      title,
      price: parseFloat(price),
      description,
      category,
      image,
      // Incluye rating si lo tienes, o un valor por defecto
      rating: {
        rate: parseFloat(ratingRate) || 0,
        count: parseInt(ratingCount) || 0
      }
    };

    if (isEditing) {
      // Si estamos editando, incluimos el ID del producto
      editProduct({ ...productData, id: parseInt(id) });
      alert('Producto actualizado con éxito!');
    } else {
      addProduct(productData);
      alert('Producto creado con éxito!');
    }
    navigate('/'); // Redirige a la página principal después de guardar
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '30px', border: '1px solid #eee', borderRadius: '10px', boxShadow: '0 8px 16px rgba(0,0,0,0.1)', backgroundColor: 'white' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>
        {isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}
      </h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: 'calc(100% - 20px)', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Precio:</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{ width: 'calc(100% - 20px)', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            style={{ width: 'calc(100% - 20px)', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', resize: 'vertical' }}
          ></textarea>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Categoría:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={{ width: 'calc(100% - 20px)', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>URL de Imagen:</label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            style={{ width: 'calc(100% - 20px)', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Rating (valor):</label>
          <input
            type="number"
            step="0.1"
            value={ratingRate}
            onChange={(e) => setRatingRate(e.target.value)}
            style={{ width: 'calc(100% - 20px)', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Rating (conteo):</label>
          <input
            type="number"
            value={ratingCount}
            onChange={(e) => setRatingCount(e.target.value)}
            style={{ width: 'calc(100% - 20px)', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '12px 20px',
            background: isEditing ? '#ffc107' : '#007bff',
            color: isEditing ? '#333' : 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1.1em',
            marginTop: '20px',
            transition: 'background-color 0.3s ease'
          }}
        >
          {isEditing ? 'Guardar Cambios' : 'Crear Producto'}
        </button>
        <Link to="/" style={{
          display: 'block',
          textAlign: 'center',
          marginTop: '10px',
          textDecoration: 'none',
          color: '#6c757d',
          padding: '10px 15px',
          border: '1px solid #6c757d',
          borderRadius: '5px',
          transition: 'background-color 0.3s ease, color 0.3s ease'
        }}>
          Cancelar
        </Link>
      </form>
    </div>
  );
}

export default ProductForm;