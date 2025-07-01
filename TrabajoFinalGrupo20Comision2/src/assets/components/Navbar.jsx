import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import { FaCube } from 'react-icons/fa';

import '../CSS/Navbar.css';

function Navbar() {
  const { isAuthenticated, user, logout, isAdmin, isUnauthenticated } = useAuth(); // Obtén isAdmin y isUnauthenticated
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm(`¿Seguro que quieres cerrar sesión${user ? `, ${user.username}` : ''}?`);
    if (confirmLogout) {
      logout();
      navigate('/login');
    }
  };

  // El Navbar siempre se renderiza, pero algunos elementos son condicionales
  // según el estado de autenticación y el rol.
  // Quité el 'return null' si no está autenticado para que siempre aparezca el botón de login

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <FaCube className="me-2" />
          NEW PRODUCTOS JUJUY
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Siempre visible */}
            <li className="nav-item">
              <Link className="nav-link" to="/products">Productos</Link>
            </li>
    
            {/* Solo visible si está autenticado (cliente o admin) */}
            {isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/favoritos">Favoritos</Link>
              </li>
            )}

            {/* Solo visible para administradores */}
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/crear">Crear Producto</Link>
              </li>
            )}
                    <li className="nav-item">
              <Link className="nav-link" to="/Acerca">Acerca de</Link>
            </li>

          </ul>
          <div className="d-flex">
            {/* Mensaje de bienvenida y botón de cerrar sesión */}
            {isAuthenticated && user && (
              <>
                <span className="navbar-text me-3">
                  ¡Hola, **{user.username}** ({user.role})!
                </span>
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </>
            )}

            {/* Botón de iniciar sesión solo si NO está autenticado */}
            {isUnauthenticated && (
              <Link to="/login" className="btn btn-outline-success">
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;