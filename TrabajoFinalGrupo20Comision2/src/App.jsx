import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'; 

import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

import Navbar from './assets/components/Navbar';
import PrivateRoute from './assets/components/PrivateRoute';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import FavoritesPage from './pages/FavoritesPage';
import ProductForm from './pages/ProductForm'; 
import LoginPage from './pages/Login';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <LoginPage />} />
        
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} 
        />

        {/* --- Rutas Protegidas --- */}
        <Route element={<PrivateRoute />}>
          <Route path="/products" element={<Home />} />
          <Route path="/detalle/:id" element={<ProductDetail />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
          
          {/* RUTA PARA CREAR UN NUEVO PRODUCTO */}
          <Route path="/crear" element={<ProductForm />} />
          
          {/* RUTA PARA EDITAR UN PRODUCTO EXISTENTE (con ID) */}
          <Route path="/editar/:id" element={<ProductForm />} />
        </Route>

        <Route path="*" element={<h2 style={{ padding: '2rem' }}>Página no encontrada</h2>} />
      </Routes>
    </Router>
  );
}

export default App;