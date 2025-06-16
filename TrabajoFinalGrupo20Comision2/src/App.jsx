import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductsProvider } from './context/ProductsContext.js';
import { FavoritesProvider } from './context/FavoritesContext.js';

// import NavBar from './components/NavBar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import FavoritesPage from './pages/FavoritesPage';
import ProductForm from './pages/ProductForm';

function App() {
  return (
    <ProductsProvider>
      <FavoritesProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detalle/:id" element={<ProductDetail />} />
            <Route path="/favoritos" element={<FavoritesPage />} />
            <Route path="/crear" element={<ProductForm />} />
            <Route path="/editar/:id" element={<ProductForm />} />
            {/* Ruta fallback opcional */}
            <Route path="*" element={<h2 style={{ padding: '2rem' }}>Página no encontrada</h2>} />
          </Routes>
        </Router>
      </FavoritesProvider>
    </ProductsProvider>
  );
}

export default App;
