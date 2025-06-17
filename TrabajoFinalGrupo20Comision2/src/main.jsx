// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductsProvider } from './context/ProductsProvider.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';
import { FavoritesProvider } from './context/FavoritesProvider.jsx'; // ¡Importa el FavoritesProvider!

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ProductsProvider>
        <FavoritesProvider> {/* Envuelve App con FavoritesProvider */}
          <App />
        </FavoritesProvider>
      </ProductsProvider>
    </AuthProvider>
  </StrictMode>,
);
