import  { useState } from 'react';
import { useAuth } from '../hooks/AuthContext.js'; // Ajusta la ruta si es necesario
import { useNavigate } from 'react-router-dom'; // Para redireccionar después del login

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
      setErrorMessage(error.message); // Muestra el mensaje de error del login
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            required
          />
        </div>
        {errorMessage && <p style={{ color: 'red', marginBottom: '15px' }}>{errorMessage}</p>}
        <button
          type="submit"
          disabled={loading} // Deshabilita el botón mientras carga
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Iniciando sesión...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;