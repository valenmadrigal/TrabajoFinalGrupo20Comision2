// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/AuthContext.js';

// Importa tus páginas y componentes
// import NavBar from './components/NavBar'; // Asegúrate de descomentar esto si usas NavBar
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import FavoritesPage from './pages/FavoritesPage';
import ProductForm from './pages/ProductForm';
import LoginPage from './pages/Login';

function App() {
  const { isAuthenticated } = useAuth(); // Obtén el estado de autenticación

  return (
    <Router>
      {/* Si tienes un componente NavBar, descoméntalo aquí */}
      {/* <NavBar /> */}
      <Routes>
        {/*
          Ruta principal:
          Si el usuario está autenticado, muestra Home.
          Si no está autenticado, muestra LoginPage.
        */}
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <LoginPage />}
        />

        {/* Ruta para el detalle del producto */}
        <Route path="/detalle/:id" element={<ProductDetail />} />

        {/* Ruta para la página de favoritos */}
        <Route path="/favoritos" element={<FavoritesPage />} />

        {/* Rutas para crear y editar productos (puedes protegerlas si lo deseas) */}
        <Route path="/crear" element={<ProductForm />} />
        <Route path="/editar/:id" element={<ProductForm />} />

        {/* Ya no necesitamos una ruta /login explícita, ya que la principal la gestiona */}
        {/* <Route path="/login" element={<LoginPage />} /> */}

        {/* Ruta fallback opcional para páginas no encontradas */}
        <Route path="*" element={<h2 style={{ padding: '2rem' }}>Página no encontrada</h2>} />
      </Routes>
    </Router>
  );
}

export default App;