import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login({ setIsAuthenticated }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Ejemplo simple: usuario "admin" y contraseña "1234"
    if (user === 'admin' && pass === '1234') {
      setIsAuthenticated(true)
      navigate('/')
    } else {
      alert('Usuario o contraseña incorrectos')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={user}
        onChange={e => setUser(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={pass}
        onChange={e => setPass(e.target.value)}
      />
      <button type="submit">Ingresar</button>
    </form>
  )
}

export default Login