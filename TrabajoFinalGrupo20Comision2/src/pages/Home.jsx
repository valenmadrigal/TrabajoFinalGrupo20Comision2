
function Home({ setIsAuthenticated })
 {
  return (
    <div className="home-container">
      <h1>Bienvenido</h1>
      <button onClick={() => setIsAuthenticated(false)}>Cerrar sesión</button>
    </div>
  )
}

export default Home;