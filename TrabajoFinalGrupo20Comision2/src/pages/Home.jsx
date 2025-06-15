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
    <div className="container mt-4">
      <h1 className="mb-4">Listado de Productos</h1>
      <div className="d-flex flex-wrap justify-content-start">
        {productos.map((p) => (
          <ProductCard key={p.id} producto={p} />
        ))}
      </div>
    </div>
  );
}

export default Home;
// Este es un componente de React que muestra una lista de productos utilizando el componente ProductCard.