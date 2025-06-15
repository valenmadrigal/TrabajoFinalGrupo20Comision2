import React from 'react';
import '../CSS/ProductCard.css';

import { FaTag, FaInfoCircle } from 'react-icons/fa'; // Asegurate de tener react-icons instalado

function ProductCard({ producto }) {
  return (
    <div className="card product-card shadow-sm h-100 fade-in">

      <img
        src={producto.imagen || 'https://via.placeholder.com/300x200?text=Sin+imagen'}
        className="card-img-top product-img"
        alt={producto.nombre}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text text-muted">{producto.descripcion}</p>
        <p className="card-text fw-bold text-success">Precio: ${producto.precio}</p>

        {/* Categoría con ícono */}
        <div className="product-category mb-3">
          <FaTag className="me-1 text-secondary" />
          <span className="badge bg-info text-dark">{producto.categoria}</span>
        </div>
          
       <div className="mt-auto d-flex flex-column align-items-center gap-2">
         <button className="btn btn-info btn-ver-mas">
           <FaInfoCircle className="me-1" />
               Ver más
        </button>

         <div className="form-check">
          <input type="checkbox" title="Favorito" className="form-check-input" />
        </div>
</div>

      </div>
    </div>
  );
}

export default ProductCard;
