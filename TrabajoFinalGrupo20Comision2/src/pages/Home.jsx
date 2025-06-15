import React from 'react';
import ProductCard from '../assets/components/ProductCard';
import '../assets/CSS/Home.css';

const productos = [
  {
    id: 1,
    imagen: '',
    nombre: 'Producto 1',
    precio: 1000,
    descripcion: 'Descripción del producto 1.',
    categoria: 'Electrónica',
  },
  {
    id: 2,
    imagen: '',
    nombre: 'Producto 2',
    precio: 1500,
    descripcion: 'Descripción del producto 2.',
    categoria: 'Hogar',
  },
  {
    id: 3,
    imagen: '',
    nombre: 'Producto 3',
    precio: 1004,
    descripcion: 'Descripción del producto 3.',
    categoria: 'Electrónica',
  },
];

function Home() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5 text-primary fw-bold">Listado de Productos</h1>
      <div className="row g-4">
        {productos.map((p) => (
          <div className="col-12 col-sm-6 col-md-4" key={p.id}>
            <ProductCard producto={p} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
// Este es un componente de React que muestra una lista de productos utilizando el componente ProductCard.