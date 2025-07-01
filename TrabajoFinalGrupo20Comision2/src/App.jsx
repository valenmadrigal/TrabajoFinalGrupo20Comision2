
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Proveedores de Contexto
import { AuthProvider} from './context/AuthProvider'; // Mantén useAuth aquí si lo usas en App
import { ProductsProvider } from './context/ProductsProvider';
import { FavoritesProvider } from './context/FavoritesProvider';
import { IntegrantesProvider } from './context/IntegrantesProvider'; // Asegúrate de que esta ruta y nombre sean correctos

// Componentes de la Aplicación
import Navbar from './assets/components/Navbar';
import Footer from './assets/components/Footer';

// Páginas
import LoginPage from './pages/Login';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail'; // Asegúrate de que este componente exista y su ruta sea correcta
import ProductForm from './pages/ProductForm';
import FavoritesPage from './pages/FavoritesPage';
import Acerca from './pages/Acerca';

// Componentes de Rutas Protegidas
import PrivateRoute from './assets/components/PrivateRoute';
import AdminRoute from './assets/components/AdminRoute'; // Importa el nuevo AdminRoute

function App() {
 
  return (
    <Router>
      {/* Envuelve toda la aplicación con los proveedores de contexto */}
      <AuthProvider>
        <ProductsProvider>
          <FavoritesProvider>
            <IntegrantesProvider>
              <Navbar /> {/* El Navbar se renderizará fuera de las rutas, puede usar useAuth */}
              <Routes>
                {/* 1. Rutas Públicas (accesibles por cualquiera, incluso no autenticados) */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/Acerca" element={<Acerca />} />
                <Route path="/" element={<Home />} /> {/* Home es accesible para todos */}
                <Route path="/products" element={<Home />} /> {/* alias para Home */}
                <Route path="/detalle/:id" element={<ProductDetail />} /> {/* Detalle es accesible para todos */}

                {/* 2. Rutas Protegidas (solo para usuarios autenticados: admin y cliente) */}
                <Route element={<PrivateRoute />}>
                  {/* Los favoritos solo se pueden ver y manipular si estás logueado */}
                  <Route path="/favoritos" element={<FavoritesPage />} />
                </Route>

                {/* 3. Rutas de Administrador (solo para usuarios con rol 'admin') */}
                <Route element={<AdminRoute />}>
                  <Route path="/crear" element={<ProductForm />} />
                  <Route path="/editar/:id" element={<ProductForm />} />
                </Route>

                {/* Ruta de 404 (No encontrada) */}
                <Route path="*" element={<h2 style={{ padding: '2rem', textAlign: 'center' }}>404 | Página no encontrada</h2>} />
              </Routes>
              <Footer />
            </IntegrantesProvider>
          </FavoritesProvider>
        </ProductsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;