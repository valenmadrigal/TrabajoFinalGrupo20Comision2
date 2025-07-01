

export const validateProductForm = (formData) => {
  const errors = {};

  // Validar Título
  if (!formData.title.trim()) {
    errors.title = 'El título del producto es obligatorio.';
  }

  // Validar Precio
  if (!formData.price || isNaN(parseFloat(formData.price))) {
    errors.price = 'El precio es obligatorio y debe ser un número.';
  } else if (parseFloat(formData.price) <= 0) {
    errors.price = 'El precio debe ser un valor positivo.';
  }

  // Validar Descripción
  if (!formData.description.trim()) {
    errors.description = 'La descripción es obligatoria.';
  } else if (formData.description.trim().length < 10) {
    errors.description = 'La descripción debe tener al menos 10 caracteres.';
  }

  // Validar Categoría
  if (!formData.category.trim()) {
    errors.category = 'La categoría es obligatoria.';
  }

  // Validar URL de Imagen
  if (!formData.image.trim()) {
    errors.image = 'La URL de la imagen es obligatoria.';
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(formData.image)) {
    errors.image = 'La URL de la imagen no es válida.';
  }

  return errors; // Retorna un objeto con los errores encontrados
};

// Definición de las categorías para el desplegable
export const productCategories = [
  'Ropa',
  'Electrodoméstico',
  'Joyería',
  'Calzado',
  'Mercadería',
  'Muebles',
  'Otros'
];