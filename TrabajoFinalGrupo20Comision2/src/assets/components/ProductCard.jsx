import React from 'react';
import '../CSS/ProductCard.css';

function ProductCard({ producto }) {
  return (
    <div className="card product-card shadow-sm">
      {/* Imagen del producto */}
      <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />

      <div className="card-body">
        {/* Nombre del producto */}
        <h5 className="card-title">{producto.nombre}</h5>

        {/* Descripción */}
        <p className="card-text">{producto.descripcion}</p>

        {/* Precio */}
        <p className="card-text fw-bold">Precio: ${producto.precio}</p>

        {/* Categoría */}
        <p className="card-text text-muted">Categoría: {producto.categoria}</p>

        {/* Botones de acción */}
        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-primary btn-sm">Ver más</button>
          <input type="checkbox" title="Favorito" />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
