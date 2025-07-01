// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { ProductsProvider } from './context/ProductsProvider.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';
import { FavoritesProvider } from './context/FavoritesProvider.jsx';
import { IntegrantesProvider } from './context/IntegrantesProvider.jsx'; // ¡Añadiremos este!

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ProductsProvider>
        <FavoritesProvider>
         
          <IntegrantesProvider>
            <App />
          </IntegrantesProvider>
        </FavoritesProvider>
      </ProductsProvider>
    </AuthProvider>
  </StrictMode>,
);