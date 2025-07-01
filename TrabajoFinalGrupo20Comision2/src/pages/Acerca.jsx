
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/CSS/Acerca.css';

// Importa el hook para consumir el contexto
import { useIntegrantes } from '../hooks/IntegrantesContex';

function Acerca() {
  // 1. Obtén los datos de los integrantes, el estado de carga y el error del contexto
  const { integrantes, loading, error } = useIntegrantes();

  return (
    <div className="container my-5">
      <div className="card p-4 shadow-lg bg-light-subtle dark:bg-dark text-dark dark:text-light">
        <h2 className="text-center mb-4">🎓 Acerca de la Página Web</h2>
        <p className="lead text-center">
          Esta aplicación permite gestionar alumnos, registrar nuevos estudiantes y visualizar la lista completa.
        </p>

        <h3 className="text-center my-4">👥 Integrantes del Grupo n°20</h3>
        <div className="row g-4">
          {/* 2. Manejo de estados: Carga y Error */}
          {loading ? (
            <div className="text-center col-12">Cargando integrantes...</div>
          ) : error ? (
            <div className="text-center col-12 text-danger">Error al cargar los integrantes: {error}</div>
          ) : (
            // 3. Mapea los integrantes obtenidos del contexto
            integrantes.map((i) => ( // Usamos 'i.id' como key si lo tienes, si no 'idx' está bien como fallback
              <div key={i.id} className="col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100 text-center border-info shadow-sm">
                  <img
                    src={i.img} // Asegúrate de que tu objeto de integrante use 'imagen' o 'img' consistentemente
                    alt={i.nombre}
                    className="card-img-top rounded-circle mx-auto mt-3"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{i.nombre}</h5>
                    <p className="card-text"><strong>Rol:</strong> {i.rol}</p>
                    <p className="card-text"><strong>Email:</strong> {i.email}</p>
                    <blockquote className="blockquote-footer mt-2">{i.frase}</blockquote>
                    {/* Opcional: Si quieres mostrar el GitHub del integrante */}
                    {i.github && i.github !== '..' && (
                      <a
                        href={i.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-dark btn-sm mt-2"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="text-center mt-5">
          <h4>📬 Contacto</h4>
          <p>Email: grupo20@escuela.edu.ar</p>
        </div>

        <div className="text-center text-muted mt-3">
          📅 Año: 2025 | Materia: <strong>PROGRAMACIÓN VISUAL</strong> | Grupo 20
        </div>
      </div>
    </div>
  );
}

export default Acerca;