import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './assets/components/Login'
import Home from './pages/Home'
import Navbar from './assets/components/Navbar'
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Home setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </Router>
  )
}

export default App