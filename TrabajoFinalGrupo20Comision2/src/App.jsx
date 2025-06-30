import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/AuthContext';
// Estilos de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
// Componentes
import Navbar from './assets/components/Navbar';
import Footer from './assets/components/Footer'; 
import PrivateRoute from './assets/components/PrivateRoute';
// Páginas
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import FavoritesPage from './pages/FavoritesPage';
import ProductForm from './pages/ProductForm'; 
import LoginPage from './pages/Login';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      {/* Barra de navegación que aparece siempre */}
      <Navbar />
      {/* Rutas*/}
      <Routes>
        {/* Página principal: si está autenticado va al Home, si no, al login */}
        <Route path="/" element={isAuthenticated ? <Home /> : <LoginPage />} />
        
        {/* Página de login: si ya está autenticado, redirige al Home */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} 
        />

        {/* --- Rutas protegidas (solo si hay sesión iniciada) --- */}
        <Route element={<PrivateRoute />}>
          <Route path="/products" element={<Home />} />
          <Route path="/detalle/:id" element={<ProductDetail />} />
          <Route path="/favoritos" element={<FavoritesPage />} />

          {/* Crear o editar productos */}
          <Route path="/crear" element={<ProductForm />} />

          <Route path="/editar/:id" element={<ProductForm />} />
        </Route>

        {/* Ruta no encontrada */}
        <Route path="*" element={<h2 style={{ padding: '2rem' }}>Página no encontrada</h2>} />
      </Routes>
      <Footer />
    
    </Router>
  );
}
export default App;
