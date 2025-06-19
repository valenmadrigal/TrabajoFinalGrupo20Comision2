import { useState } from 'react';
import { useAuth } from '../hooks/AuthContext.js'; // Ajusta la ruta si es necesario
import { useNavigate } from 'react-router-dom'; // Para redireccionar después del login
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap'; // Importaciones de React-Bootstrap
import '../assets/CSS/Login.css'; // Importa el archivo CSS

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login, loading, isAuthenticated } = useAuth(); // Obtiene funciones y estado del contexto
  const navigate = useNavigate();

  // Si ya está autenticado, redirige a la página de inicio
  if (isAuthenticated) {
    navigate('/');
    return null; // No renderiza nada si ya está logueado
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Limpia mensajes de error anteriores
    try {
      await login(username, password); // Llama a la función de login del contexto
      // Si el login es exitoso, el efecto en App.jsx redirigirá o puedes hacerlo aquí
      navigate('/'); // Redirige a la página de inicio
    } catch (error) {
      // Muestra el mensaje de error del login
      setErrorMessage(error.message || 'Error al iniciar sesión. Inténtelo de nuevo.');
    }
  };

  return (
    <Container className="login-container">
      <h2 className="login-title">Iniciar Sesión</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Usuario:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Contraseña:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {errorMessage && <Alert variant="danger" className="error-alert">{errorMessage}</Alert>}

        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          className="login-button"
        >
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              {' '}
              Iniciando sesión...
            </>
          ) : (
            'Login'
          )}
        </Button>
      </Form>
    </Container>
  );
}

export default LoginPage;