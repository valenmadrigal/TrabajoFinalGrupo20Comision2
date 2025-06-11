function Home({ setIsAuthenticated }) {
  return (
    <div>
      <h1>Bienvenido al Home</h1>
      <button onClick={() => setIsAuthenticated(false)}>Cerrar sesión</button>
    </div>
  )
}

export default Home