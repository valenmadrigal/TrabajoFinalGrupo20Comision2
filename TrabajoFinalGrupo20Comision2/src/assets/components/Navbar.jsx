// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ background: '#282c34', padding: '15px 20px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
      <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          Tienda
        </Link>
      </div>
      <div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}>
          Inicio
        </Link>
        <Link to="/favorites" style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}>
          Favoritos
        </Link>
        <Link to="/product/new" style={{ color: 'white', textDecoration: 'none' }}>
          Crear Producto
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;